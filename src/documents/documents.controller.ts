import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, ForbiddenException, NotFoundException, BadRequestException, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AppDocument } from './schemas/document.schema';
import { Matter } from '../matters/schemas/matter.schema';
import { User } from '../users/schemas/user.schema';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('api/v1/documents')
export class DocumentsController {
    constructor(
        @InjectModel(AppDocument.name) private documentModel: Model<AppDocument>,
        @InjectModel(Matter.name) private matterModel: Model<Matter>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    private async resolveLawyerUserIds(headerId?: string, headerEmail?: string, headerName?: string): Promise<Types.ObjectId[]> {
        const ids: Types.ObjectId[] = [];
        if (headerId && Types.ObjectId.isValid(headerId)) {
            ids.push(new Types.ObjectId(headerId));
        }
        if (headerEmail) {
            const userByEmail = await this.userModel.findOne({ email: headerEmail.toLowerCase() }).exec();
            if (userByEmail && !ids.some(i => i.equals(userByEmail._id as Types.ObjectId))) {
                ids.push(userByEmail._id as Types.ObjectId);
            }
        }
        if (headerName && ids.length === 0) {
            const userByName = await this.userModel.findOne({
                $or: [
                    { firstName: { $regex: new RegExp(headerName, 'i') } },
                    { lastName: { $regex: new RegExp(headerName, 'i') } }
                ]
            }).exec();
            if (userByName && !ids.some(i => i.equals(userByName._id as Types.ObjectId))) {
                ids.push(userByName._id as Types.ObjectId);
            }
        }
        return ids;
    }

    private async resolveLawyerAssignedMatters(headerId?: string, headerEmail?: string, headerName?: string) {
        const lawyerIds = await this.resolveLawyerUserIds(headerId, headerEmail, headerName);
        if (lawyerIds.length === 0) {
            return { matters: [], identifiers: [] };
        }
        const matters = await this.matterModel.find({
            $or: [
                { assignedLawyerIds: { $in: lawyerIds } },
                { assignedPartnerId: { $in: lawyerIds } }
            ]
        }).exec();

        const identifiers: (string | Types.ObjectId)[] = [];
        for (const m of matters) {
            identifiers.push(m._id);
            identifiers.push(m._id.toString());
            if (m.matterNumber) {
                identifiers.push(m.matterNumber);
            }
        }
        return { matters, identifiers };
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/documents',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    }))
    async uploadFile(
        @UploadedFile() file: any,
        @Body() body: any,
        @Headers('x-user-role') headerRole?: string,
        @Headers('x-user-id') headerId?: string,
        @Headers('x-user-email') headerEmail?: string,
        @Headers('x-user-name') headerName?: string
    ) {
        if (!file) {
            throw new BadRequestException('Physical file attachment is required.');
        }

        const role = body.userRole || headerRole;
        if (role === 'lawyer') {
            const targetMatterId = body.matterId;
            if (!targetMatterId) {
                throw new BadRequestException('Matter reference is required for lawyer document uploads.');
            }
            const { identifiers } = await this.resolveLawyerAssignedMatters(headerId, headerEmail, headerName);
            const isAssigned = identifiers.some(i => i.toString() === targetMatterId.toString());
            if (!isAssigned) {
                throw new ForbiddenException('Access denied: You can only upload documents to cases assigned to you.');
            }
        }

        const createDto = {
            ...body,
            originalFileName: file.originalname,
            fileUrl: `/api/v1/documents/serve/${file.filename}`,
            uploadedBy: (headerId && Types.ObjectId.isValid(headerId)) ? new Types.ObjectId(headerId) : undefined
        };
        const created = new this.documentModel(createDto);
        return await created.save();
    }

    @Get('serve/:filename')
    serveFile(@Param('filename') filename: string, @Res() res: Response) {
        const ext = extname(filename).toLowerCase();
        let contentType = 'application/octet-stream';
        if (ext === '.pdf') contentType = 'application/pdf';
        else if (ext === '.docx' || ext === '.doc') contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        else if (ext === '.png') contentType = 'image/png';
        else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

        return res.sendFile(filename, {
            root: './uploads/documents',
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `inline; filename="${filename}"`
            }
        });
    }

    @Post()
    async create(
        @Body() createDto: any,
        @Headers('x-user-role') headerRole?: string,
        @Headers('x-user-id') headerId?: string,
        @Headers('x-user-email') headerEmail?: string,
        @Headers('x-user-name') headerName?: string
    ) {
        const role = createDto.userRole || headerRole;
        if (role === 'lawyer') {
            const targetMatterId = createDto.matterId;
            if (!targetMatterId) {
                throw new BadRequestException('Matter reference is required for lawyer document uploads.');
            }
            const { identifiers } = await this.resolveLawyerAssignedMatters(headerId, headerEmail, headerName);
            const isAssigned = identifiers.some(i => i.toString() === targetMatterId.toString());
            if (!isAssigned) {
                throw new ForbiddenException('Access denied: You can only upload documents to cases assigned to you.');
            }
        }

        const created = new this.documentModel(createDto);
        return await created.save();
    }

    @Get()
    async findAll(
        @Headers('x-user-role') headerRole?: string,
        @Headers('x-user-id') headerId?: string,
        @Headers('x-user-email') headerEmail?: string,
        @Headers('x-user-name') headerName?: string
    ) {
        if (headerRole === 'lawyer') {
            const { identifiers } = await this.resolveLawyerAssignedMatters(headerId, headerEmail, headerName);
            if (identifiers.length === 0) {
                return [];
            }
            return await this.documentModel.find({
                matterId: { $in: identifiers }
            }).exec();
        }
        return await this.documentModel.find().exec();
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Headers('x-user-role') headerRole?: string,
        @Headers('x-user-id') headerId?: string,
        @Headers('x-user-email') headerEmail?: string,
        @Headers('x-user-name') headerName?: string
    ) {
        const doc = await this.documentModel.findById(id).exec();
        if (!doc) {
            throw new NotFoundException(`Document ${id} not found`);
        }
        if (headerRole === 'lawyer') {
            const { identifiers } = await this.resolveLawyerAssignedMatters(headerId, headerEmail, headerName);
            const docMatterId = doc.matterId?.toString();
            const hasAccess = identifiers.some(i => i.toString() === docMatterId);
            if (!hasAccess) {
                throw new ForbiddenException('Access denied: You are only permitted to view documents from your assigned cases.');
            }
        }
        return doc;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: any) {
        return await this.documentModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Headers('x-user-role') headerRole?: string
    ) {
        if (headerRole === 'lawyer') {
            throw new ForbiddenException('Only Administrators have permission to delete documents from the firm repository.');
        }
        return await this.documentModel.findByIdAndDelete(id).exec();
    }
}

