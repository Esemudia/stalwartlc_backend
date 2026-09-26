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
exports.MattersController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const matter_schema_1 = require("./schemas/matter.schema");
const user_schema_1 = require("../users/schemas/user.schema");
let MattersController = class MattersController {
    matterModel;
    userModel;
    constructor(matterModel, userModel) {
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
    async create(createMatterDto, headerRole) {
        if (headerRole === 'lawyer') {
            throw new common_1.ForbiddenException('Only Administrators have permission to register new matters.');
        }
        const createdMatter = new this.matterModel(createMatterDto);
        return await createdMatter.save();
    }
    async findAll(headerRole, headerId, headerEmail, headerName) {
        if (headerRole === 'lawyer') {
            const lawyerIds = await this.resolveLawyerUserIds(headerId, headerEmail, headerName);
            if (lawyerIds.length === 0) {
                return [];
            }
            return await this.matterModel.find({
                $or: [
                    { assignedLawyerIds: { $in: lawyerIds } },
                    { assignedPartnerId: { $in: lawyerIds } }
                ]
            }).exec();
        }
        return await this.matterModel.find().exec();
    }
    async findOne(id, headerRole, headerId, headerEmail, headerName) {
        const matter = await this.matterModel.findById(id).exec();
        if (!matter) {
            throw new common_1.NotFoundException(`Matter ${id} not found`);
        }
        if (headerRole === 'lawyer') {
            const lawyerIds = await this.resolveLawyerUserIds(headerId, headerEmail, headerName);
            const isAssigned = lawyerIds.some(lid => (matter.assignedLawyerIds || []).some((aid) => aid.toString() === lid.toString()) ||
                (matter.assignedPartnerId && matter.assignedPartnerId.toString() === lid.toString()));
            if (!isAssigned) {
                throw new common_1.ForbiddenException('Access denied: You are only permitted to access matters assigned to you.');
            }
        }
        return matter;
    }
    async update(id, updateMatterDto) {
        return await this.matterModel.findByIdAndUpdate(id, updateMatterDto, { new: true }).exec();
    }
    async assignLawyers(id, assignDto, headerRole) {
        if (headerRole === 'lawyer') {
            throw new common_1.ForbiddenException('Only Administrators have permission to assign lawyers to matters.');
        }
        return await this.matterModel.findByIdAndUpdate(id, { $addToSet: { assignedLawyerIds: { $each: assignDto.lawyerIds.map(i => new mongoose_2.Types.ObjectId(i)) } } }, { new: true }).exec();
    }
    async closeMatter(id, headerRole) {
        if (headerRole === 'lawyer') {
            throw new common_1.ForbiddenException('Only Administrators have permission to close matters.');
        }
        return await this.matterModel.findByIdAndUpdate(id, { status: 'closed', closedAt: new Date() }, { new: true }).exec();
    }
};
exports.MattersController = MattersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MattersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('x-user-role')),
    __param(1, (0, common_1.Headers)('x-user-id')),
    __param(2, (0, common_1.Headers)('x-user-email')),
    __param(3, (0, common_1.Headers)('x-user-name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], MattersController.prototype, "findAll", null);
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
], MattersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MattersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/assign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-user-role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], MattersController.prototype, "assignLawyers", null);
__decorate([
    (0, common_1.Post)(':id/close'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MattersController.prototype, "closeMatter", null);
exports.MattersController = MattersController = __decorate([
    (0, common_1.Controller)('api/v1/matters'),
    __param(0, (0, mongoose_1.InjectModel)(matter_schema_1.Matter.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MattersController);
//# sourceMappingURL=matters.controller.js.map