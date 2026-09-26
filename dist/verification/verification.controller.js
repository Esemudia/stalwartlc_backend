"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const verificationrecord_schema_1 = require("./schemas/verificationrecord.schema");
const matter_schema_1 = require("../matters/schemas/matter.schema");
const document_schema_1 = require("../documents/schemas/document.schema");
const client_schema_1 = require("../clients/schemas/client.schema");
let VerificationController = class VerificationController {
    model;
    matterModel;
    documentModel;
    clientModel;
    constructor(model, matterModel, documentModel, clientModel) {
        this.model = model;
        this.matterModel = matterModel;
        this.documentModel = documentModel;
        this.clientModel = clientModel;
    }
    async create(createDto) {
        if (!createDto.verificationCode) {
            const year = new Date().getFullYear();
            const rand = Math.floor(100000 + Math.random() * 900000);
            createDto.verificationCode = `STW-VER-${year}-${rand}`;
        }
        if (!createDto.hash) {
            const randomBytes = Array.from({ length: 32 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
            createDto.hash = `SHA256: ${randomBytes}`;
        }
        if (createDto.documentId && mongoose_2.Types.ObjectId.isValid(createDto.documentId)) {
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
        if (createDto.matterId && mongoose_2.Types.ObjectId.isValid(createDto.matterId)) {
            const matter = await this.matterModel.findById(createDto.matterId).exec();
            if (matter) {
                createDto.matterTitle = matter.matterNumber ? `[${matter.matterNumber}] ${matter.title}` : matter.title;
                if (!createDto.clientId && matter.clientId) {
                    createDto.clientId = matter.clientId;
                }
            }
        }
        if (createDto.clientId && mongoose_2.Types.ObjectId.isValid(createDto.clientId)) {
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
    async findAll() {
        const systemDocs = await this.documentModel.find().exec();
        const systemMatters = await this.matterModel.find().exec();
        const systemClients = await this.clientModel.find().exec();
        let records = await this.model.find().sort({ createdAt: -1 }).exec();
        const hasUnlinkedLegacy = records.some(r => r.matterTitle === 'Zenith Global vs. Maritime Operators Authority' ||
            r.matterTitle === 'Cross-Border Aircraft Fleet Operating Lease' ||
            r.matterTitle === 'Series B Equity Financing & Escrow Undertaking');
        if (records.length === 0 || hasUnlinkedLegacy) {
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
            const newRecords = [];
            const year = new Date().getFullYear();
            for (let i = 0; i < systemDocs.length; i++) {
                const doc = systemDocs[i];
                const matter = systemMatters.find(m => doc.matterId && m._id.toString() === doc.matterId.toString());
                const client = systemClients.find(c => (doc.clientId && c._id.toString() === doc.clientId.toString()) ||
                    (matter?.clientId && c._id.toString() === matter.clientId.toString()));
                const matterTitle = matter
                    ? (matter.matterNumber ? `[${matter.matterNumber}] ${matter.title}` : matter.title)
                    : (systemMatters[0] ? `[${systemMatters[0].matterNumber}] ${systemMatters[0].title}` : 'General Legal Registry');
                const clientName = client
                    ? (client.companyName || `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.email)
                    : 'Stalwart Law Retainer Client';
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
        const outdated = records.some(r => r.signatoryName === 'Dr. C. O. Stalwart (SAN)' || r.signatoryName === 'Babatunde Adeleke, SAN');
        if (outdated) {
            await this.model.updateMany({ signatoryName: { $in: ['Dr. C. O. Stalwart (SAN)', 'Babatunde Adeleke, SAN'] } }, { signatoryName: 'Aghogho F. Okpako, Esq', signatoryRole: 'Legal Practitioner & Managing Partner' }).exec();
            records = await this.model.find().sort({ createdAt: -1 }).exec();
        }
        return records;
    }
    async lookup(query) {
        const cleanQuery = query.trim();
        let record = await this.model.findOne({ verificationCode: cleanQuery }).exec();
        if (!record) {
            record = await this.model.findOne({
                hash: { $regex: new RegExp(cleanQuery.replace('SHA256: ', ''), 'i') }
            }).exec();
        }
        if (!record && mongoose_2.Types.ObjectId.isValid(cleanQuery)) {
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
    async findOne(id) {
        if (mongoose_2.Types.ObjectId.isValid(id)) {
            const byId = await this.model.findById(id).exec();
            if (byId)
                return byId;
        }
        return await this.model.findOne({
            $or: [
                { verificationCode: id },
                { hash: id },
                { hash: `SHA256: ${id}` }
            ]
        }).exec();
    }
    async revoke(id, body) {
        const filter = mongoose_2.Types.ObjectId.isValid(id) ? { _id: id } : { verificationCode: id };
        return await this.model.findOneAndUpdate(filter, {
            status: 'revoked',
            revokedAt: new Date(),
            revocationReason: body?.reason || 'Certificate revoked by issuing counsel.'
        }, { new: true }).exec();
    }
    async update(id, updateDto) {
        const filter = mongoose_2.Types.ObjectId.isValid(id) ? { _id: id } : { verificationCode: id };
        return await this.model.findOneAndUpdate(filter, updateDto, { new: true }).exec();
    }
    async remove(id) {
        const filter = mongoose_2.Types.ObjectId.isValid(id) ? { _id: id } : { verificationCode: id };
        return await this.model.findOneAndDelete(filter).exec();
    }
};
exports.VerificationController = VerificationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('lookup/:query'),
    __param(0, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "lookup", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/revoke'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "revoke", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "remove", null);
exports.VerificationController = VerificationController = __decorate([
    (0, common_1.Controller)('api/v1/verification'),
    __param(0, (0, mongoose_1.InjectModel)(verificationrecord_schema_1.VerificationRecord.name)),
    __param(1, (0, mongoose_1.InjectModel)(matter_schema_1.Matter.name)),
    __param(2, (0, mongoose_1.InjectModel)(document_schema_1.AppDocument.name)),
    __param(3, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], VerificationController);
//# sourceMappingURL=verification.controller.js.map