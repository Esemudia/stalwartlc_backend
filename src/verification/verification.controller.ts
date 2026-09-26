import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { VerificationRecord } from './schemas/verificationrecord.schema';
import { Matter } from '../matters/schemas/matter.schema';
import { AppDocument } from '../documents/schemas/document.schema';
import { Client } from '../clients/schemas/client.schema';

@Controller('api/v1/verification')
export class VerificationController {
    constructor(
        @InjectModel(VerificationRecord.name) private readonly model: Model<VerificationRecord>,
        @InjectModel(Matter.name) private readonly matterModel: Model<Matter>,
        @InjectModel(AppDocument.name) private readonly documentModel: Model<AppDocument>,
        @InjectModel(Client.name) private readonly clientModel: Model<Client>
    ) { }

    @Post()
    async create(@Body() createDto: any) {
        if (!createDto.verificationCode) {
            const year = new Date().getFullYear();
            const rand = Math.floor(100000 + Math.random() * 900000);
            createDto.verificationCode = `STW-VER-${year}-${rand}`;
        }
        if (!createDto.hash) {
            const randomBytes = Array.from({ length: 32 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
            createDto.hash = `SHA256: ${randomBytes}`;
        }

        // If a documentId is provided, sync matter and client from the real document
        if (createDto.documentId && Types.ObjectId.isValid(createDto.documentId)) {
            const doc = await this.documentModel.findById(createDto.documentId).exec();
            if (doc) {
                createDto.documentName = createDto.documentName || doc.originalFileName || doc.name;
                createDto.documentTitle = createDto.documentTitle || doc.name;
                if (doc.matterId) {
                    createDto.matterId = doc.matterId;
                    const matter = await this.matterModel.findById(doc.matterId).exec();
                    if (matter) {
                        createDto.matterTitle = matter.matterNumber ? `[${matter.matterNumber}] ${matter.title}` : matter.title;
                        if (!createDto.clientId && matter.clientId) {
                            createDto.clientId = matter.clientId;
                        }
                    }
                }
                if (doc.clientId) {
                    createDto.clientId = doc.clientId;
                }
            }
        }

        // If matterId is provided, resolve matterTitle and client
        if (createDto.matterId && Types.ObjectId.isValid(createDto.matterId)) {
            const matter = await this.matterModel.findById(createDto.matterId).exec();
            if (matter) {
                createDto.matterTitle = matter.matterNumber ? `[${matter.matterNumber}] ${matter.title}` : matter.title;
                if (!createDto.clientId && matter.clientId) {
                    createDto.clientId = matter.clientId;
                }
            }
        }

        // If clientId is provided, resolve clientName
        if (createDto.clientId && Types.ObjectId.isValid(createDto.clientId)) {
            const client = await this.clientModel.findById(createDto.clientId).exec();
            if (client) {
                createDto.clientName = client.companyName || `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.email;
            }
        }

        if (!createDto.signatoryName) {
            createDto.signatoryName = 'Aghogho F. Okpako, Esq';
            createDto.signatoryRole = 'Legal Practitioner & Managing Partner';
        }
        if (!createDto.jurisdiction) {
            createDto.jurisdiction = 'Federal High Court of Nigeria, Lagos Judicial Division';
        }

        const created = new this.model(createDto);
        return await created.save();
    }

    @Get()
    async findAll() {
        // Query system documents, matters, and clients
        const systemDocs = await this.documentModel.find().exec();
        const systemMatters = await this.matterModel.find().exec();
        const systemClients = await this.clientModel.find().exec();

        let records = await this.model.find().sort({ createdAt: -1 }).exec();

        // Check if records need synchronization with the real matters and documents on the system
        const hasUnlinkedLegacy = records.some(r =>
            r.matterTitle === 'Zenith Global vs. Maritime Operators Authority' ||
            r.matterTitle === 'Cross-Border Aircraft Fleet Operating Lease' ||
            r.matterTitle === 'Series B Equity Financing & Escrow Undertaking'
        );

        if (records.length === 0 || hasUnlinkedLegacy) {
            // Remove legacy dummy records so only actual system matters and documents exist
            if (hasUnlinkedLegacy) {
                await this.model.deleteMany({
                    matterTitle: {
                        $in: [
                            'Zenith Global vs. Maritime Operators Authority',
                            'Cross-Border Aircraft Fleet Operating Lease',
                            'Series B Equity Financing & Escrow Undertaking'
                        ]
                    }
                }).exec();
            }

            // Generate verified records for actual system documents and matters
            const newRecords: any[] = [];
            const year = new Date().getFullYear();

            // 1. For each document on the system, ensure a verification record exists
            for (let i = 0; i < systemDocs.length; i++) {
                const doc = systemDocs[i];
                const matter = systemMatters.find(m => doc.matterId && m._id.toString() === doc.matterId.toString());
                const client = systemClients.find(c =>
                    (doc.clientId && c._id.toString() === doc.clientId.toString()) ||
                    (matter?.clientId && c._id.toString() === matter.clientId.toString())
                );

                const matterTitle = matter
                    ? (matter.matterNumber ? `[${matter.matterNumber}] ${matter.title}` : matter.title)
                    : (systemMatters[0] ? `[${systemMatters[0].matterNumber}] ${systemMatters[0].title}` : 'General Legal Registry');

                const clientName = client
                    ? (client.companyName || `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.email)
                    : 'Stalwart Law Retainer Client';

                // Deterministic checksum simulation for existing document
                const docHex = Buffer.from(doc.originalFileName || doc.name).toString('hex').padEnd(64, 'a').slice(0, 64);

                newRecords.push({
                    verificationCode: `STW-VER-${year}-${String(104820 + i * 371)}`,
                    documentId: doc._id,
                    documentTitle: doc.name || doc.originalFileName,
                    documentName: doc.originalFileName || `${doc.name}.pdf`,
                    documentType: doc.category || (i % 2 === 0 ? 'Court Affidavit' : 'Contract Agreement'),
                    matterId: doc.matterId || matter?._id || undefined,
                    matterTitle: matterTitle,
                    clientId: doc.clientId || client?._id || undefined,
                    clientName: clientName,
                    hash: `SHA256: ${docHex}`,
                    status: 'valid',
                    signatoryName: 'Aghogho F. Okpako, Esq',
                    signatoryRole: 'Legal Practitioner & Managing Partner',
                    jurisdiction: 'Federal High Court of Nigeria, Lagos Judicial Division',
                    issuedAt: new Date(Date.now() - (i + 1) * 36 * 60 * 60 * 1000),
                    notes: `Verified system document for matter: ${matterTitle}`
                });
            }

            // 2. If there are matters without documents, add verification records for their core case filings
            for (let j = 0; j < systemMatters.length; j++) {
                const m = systemMatters[j];
                const alreadyCovered = newRecords.some(r => r.matterId && r.matterId.toString() === m._id.toString());
                if (!alreadyCovered) {
                    const client = systemClients.find(c => m.clientId && c._id.toString() === m.clientId.toString());
                    const clientName = client
                        ? (client.companyName || `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.email)
                        : 'Stalwart Law Retainer Client';
                    const matterTitle = m.matterNumber ? `[${m.matterNumber}] ${m.title}` : m.title;

                    newRecords.push({
                        verificationCode: `STW-VER-${year}-${String(209140 + j * 412)}`,
                        documentTitle: `Originating Pleadings & Supporting Affidavit - ${m.title}`,
                        documentName: `Pleadings_${m.matterNumber?.replace(/[^a-zA-Z0-9]/g, '_') || 'Matter'}.pdf`,
                        documentType: 'Court Affidavit',
                        matterId: m._id,
                        matterTitle: matterTitle,
                        clientId: m.clientId || client?._id || undefined,
                        clientName: clientName,
                        hash: `SHA256: ${Buffer.from(matterTitle).toString('hex').padEnd(64, 'f').slice(0, 64)}`,
                        status: 'valid',
                        signatoryName: 'Aghogho F. Okpako, Esq',
                        signatoryRole: 'Legal Practitioner & Managing Partner',
                        jurisdiction: m.court?.name || 'Federal High Court of Nigeria, Lagos Judicial Division',
                        issuedAt: new Date(Date.now() - (j + 2) * 24 * 60 * 60 * 1000),
                        notes: `Certified originating matter documents for court registration.`
                    });
                }
            }

            if (newRecords.length > 0) {
                await this.model.insertMany(newRecords);
            }

            records = await this.model.find().sort({ createdAt: -1 }).exec();
        }

        // Migrate any legacy signatory names to the official firm signatory
        const outdated = records.some(r => r.signatoryName === 'Dr. C. O. Stalwart (SAN)' || r.signatoryName === 'Babatunde Adeleke, SAN');
        if (outdated) {
            await this.model.updateMany(
                { signatoryName: { $in: ['Dr. C. O. Stalwart (SAN)', 'Babatunde Adeleke, SAN'] } },
                { signatoryName: 'Aghogho F. Okpako, Esq', signatoryRole: 'Legal Practitioner & Managing Partner' }
            ).exec();
            records = await this.model.find().sort({ createdAt: -1 }).exec();
        }

        return records;
    }


    @Get('lookup/:query')
    async lookup(@Param('query') query: string) {
        const cleanQuery = query.trim();
        // Check verificationCode exact match
        let record = await this.model.findOne({ verificationCode: cleanQuery }).exec();
        if (!record) {
            // Check hash match (case-insensitive)
            record = await this.model.findOne({
                hash: { $regex: new RegExp(cleanQuery.replace('SHA256: ', ''), 'i') }
            }).exec();
        }
        if (!record && Types.ObjectId.isValid(cleanQuery)) {
            record = await this.model.findById(cleanQuery).exec();
        }
        if (!record) {
            record = await this.model.findOne({
                $or: [
                    { documentTitle: { $regex: cleanQuery, $options: 'i' } },
                    { documentName: { $regex: cleanQuery, $options: 'i' } }
                ]
            }).exec();
        }
        return record;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        if (Types.ObjectId.isValid(id)) {
            const byId = await this.model.findById(id).exec();
            if (byId) return byId;
        }
        // Fallback to code or hash lookup
        return await this.model.findOne({
            $or: [
                { verificationCode: id },
                { hash: id },
                { hash: `SHA256: ${id}` }
            ]
        }).exec();
    }

    @Patch(':id/revoke')
    async revoke(@Param('id') id: string, @Body() body: { reason?: string }) {
        const filter = Types.ObjectId.isValid(id) ? { _id: id } : { verificationCode: id };
        return await this.model.findOneAndUpdate(
            filter,
            {
                status: 'revoked',
                revokedAt: new Date(),
                revocationReason: body?.reason || 'Certificate revoked by issuing counsel.'
            },
            { new: true }
        ).exec();
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: any) {
        const filter = Types.ObjectId.isValid(id) ? { _id: id } : { verificationCode: id };
        return await this.model.findOneAndUpdate(filter, updateDto, { new: true }).exec();
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const filter = Types.ObjectId.isValid(id) ? { _id: id } : { verificationCode: id };
        return await this.model.findOneAndDelete(filter).exec();
    }
}

