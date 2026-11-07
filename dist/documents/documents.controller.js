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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_schema_1 = require("./schemas/document.schema");
const matter_schema_1 = require("../matters/schemas/matter.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const multer_1 = require("multer");
const path_1 = require("path");
let DocumentsController = class DocumentsController {
    documentModel;
    matterModel;
    userModel;
    constructor(documentModel, matterModel, userModel) {
        this.documentModel = documentModel;
        this.matterModel = matterModel;
        this.userModel = userModel;
    }
    async resolveLawyerUserIds(headerId, headerEmail, headerName) {
        const ids = [];
        if (headerId && mongoose_2.Types.ObjectId.isValid(headerId)) {
            ids.push(new mongoose_2.Types.ObjectId(headerId));
        }
        if (headerEmail) {
            const userByEmail = await this.userModel.findOne({ email: headerEmail.toLowerCase() }).exec();
            if (userByEmail && !ids.some(i => i.equals(userByEmail._id))) {
                ids.push(userByEmail._id);
            }
        }
        if (headerName && ids.length === 0) {
            const userByName = await this.userModel.findOne({
                $or: [
                    { firstName: { $regex: new RegExp(headerName, 'i') } },
                    { lastName: { $regex: new RegExp(headerName, 'i') } }
                ]
            }).exec();
            if (userByName && !ids.some(i => i.equals(userByName._id))) {
                ids.push(userByName._id);
            }
        }
        return ids;
    }
    async resolveLawyerAssignedMatters(headerId, headerEmail, headerName) {
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
        const identifiers = [];
        for (const m of matters) {
            identifiers.push(m._id);
            identifiers.push(m._id.toString());
            if (m.matterNumber) {
                identifiers.push(m.matterNumber);
            }
        }
        return { matters, identifiers };
    }
    async uploadFile(file, body, headerRole, headerId, headerEmail, headerName) {
        if (!file) {
            throw new common_1.BadRequestException('Physical file attachment is required.');
        }
        const role = body.userRole || headerRole;
        if (role === 'lawyer') {
            const targetMatterId = body.matterId;
            if (!targetMatterId) {
                throw new common_1.BadRequestException('Matter reference is required for lawyer document uploads.');
            }
            const { identifiers } = await this.resolveLawyerAssignedMatters(headerId, headerEmail, headerName);
            const isAssigned = identifiers.some(i => i.toString() === targetMatterId.toString());
            if (!isAssigned) {
                throw new common_1.ForbiddenException('Access denied: You can only upload documents to cases assigned to you.');
            }
        }
        const createDto = {
            ...body,
            category: (body.category && (body.category.toLowerCase().includes('exhibit') || body.category.toLowerCase().includes('evidence'))) ? 'Exhibits' : 'Court Processes',
            originalFileName: file.originalname,
            fileUrl: `/api/v1/documents/serve/${file.filename}`,
            uploadedBy: (headerId && mongoose_2.Types.ObjectId.isValid(headerId)) ? new mongoose_2.Types.ObjectId(headerId) : undefined
        };
        const created = new this.documentModel(createDto);
        return await created.save();
    }
    serveFile(filename, res) {
        const ext = (0, path_1.extname)(filename).toLowerCase();
        let contentType = 'application/octet-stream';
        if (ext === '.pdf')
            contentType = 'application/pdf';
        else if (ext === '.docx' || ext === '.doc')
            contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        else if (ext === '.png')
            contentType = 'image/png';
        else if (ext === '.jpg' || ext === '.jpeg')
            contentType = 'image/jpeg';
        return res.sendFile(filename, {
            root: './uploads/documents',
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `inline; filename="${filename}"`
            }
        });
    }
    async create(createDto, headerRole, headerId, headerEmail, headerName) {
        const role = createDto.userRole || headerRole;
        if (role === 'lawyer') {
            const targetMatterId = createDto.matterId;
            if (!targetMatterId) {
                throw new common_1.BadRequestException('Matter reference is required for lawyer document uploads.');
            }
            const { identifiers } = await this.resolveLawyerAssignedMatters(headerId, headerEmail, headerName);
            const isAssigned = identifiers.some(i => i.toString() === targetMatterId.toString());
            if (!isAssigned) {
                throw new common_1.ForbiddenException('Access denied: You can only upload documents to cases assigned to you.');
            }
        }
        const normalizedDto = {
            ...createDto,
            category: (createDto.category && (createDto.category.toLowerCase().includes('exhibit') || createDto.category.toLowerCase().includes('evidence'))) ? 'Exhibits' : 'Court Processes'
        };
        const created = new this.documentModel(normalizedDto);
        return await created.save();
    }
    async findAll(headerRole, headerId, headerEmail, headerName) {
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
    async findOne(id, headerRole, headerId, headerEmail, headerName) {
        const doc = await this.documentModel.findById(id).exec();
        if (!doc) {
            throw new common_1.NotFoundException(`Document ${id} not found`);
        }
        if (headerRole === 'lawyer') {
            const { identifiers } = await this.resolveLawyerAssignedMatters(headerId, headerEmail, headerName);
            const docMatterId = doc.matterId?.toString();
            const hasAccess = identifiers.some(i => i.toString() === docMatterId);
            if (!hasAccess) {
                throw new common_1.ForbiddenException('Access denied: You are only permitted to view documents from your assigned cases.');
            }
        }
        return doc;
    }
    async update(id, updateDto) {
        if (updateDto.category) {
            updateDto.category = (updateDto.category.toLowerCase().includes('exhibit') || updateDto.category.toLowerCase().includes('evidence')) ? 'Exhibits' : 'Court Processes';
        }
        return await this.documentModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }
    async remove(id, headerRole) {
        if (headerRole === 'lawyer') {
            throw new common_1.ForbiddenException('Only Administrators have permission to delete documents from the firm repository.');
        }
        return await this.documentModel.findByIdAndDelete(id).exec();
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/documents',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-user-role')),
    __param(3, (0, common_1.Headers)('x-user-id')),
    __param(4, (0, common_1.Headers)('x-user-email')),
    __param(5, (0, common_1.Headers)('x-user-name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('serve/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "serveFile", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __param(2, (0, common_1.Headers)('x-user-id')),
    __param(3, (0, common_1.Headers)('x-user-email')),
    __param(4, (0, common_1.Headers)('x-user-name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('x-user-role')),
    __param(1, (0, common_1.Headers)('x-user-id')),
    __param(2, (0, common_1.Headers)('x-user-email')),
    __param(3, (0, common_1.Headers)('x-user-name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __param(2, (0, common_1.Headers)('x-user-id')),
    __param(3, (0, common_1.Headers)('x-user-email')),
    __param(4, (0, common_1.Headers)('x-user-name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "remove", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)('api/v1/documents'),
    __param(0, (0, mongoose_1.InjectModel)(document_schema_1.AppDocument.name)),
    __param(1, (0, mongoose_1.InjectModel)(matter_schema_1.Matter.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map