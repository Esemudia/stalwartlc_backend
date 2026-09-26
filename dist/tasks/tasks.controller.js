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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("./schemas/task.schema");
let TasksController = class TasksController {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(createDto, headerRole, headerName) {
        const creatorRole = createDto.creatorRole || headerRole || 'super_admin';
        const creatorName = createDto.creatorName || headerName || 'Staff';
        const approvalStatus = creatorRole === 'lawyer' ? 'pending_approval' : (createDto.approvalStatus || 'approved');
        const taskData = {
            ...createDto,
            creatorRole,
            creatorName,
            approvalStatus,
            ...(approvalStatus === 'approved' && !createDto.approvedAt ? { approvedAt: new Date() } : {})
        };
        const created = new this.model(taskData);
        return await created.save();
    }
    async findAll() {
        return await this.model.find().sort({ createdAt: -1 }).exec();
    }
    async findPendingApprovals() {
        return await this.model.find({ approvalStatus: 'pending_approval' }).sort({ createdAt: -1 }).exec();
    }
    async findOne(id) {
        return await this.model.findById(id).exec();
    }
    async approveTask(id, body, userRole, userName) {
        const role = body.role || userRole || 'super_admin';
        if (role === 'lawyer') {
            throw new common_1.ForbiddenException('Lawyers cannot approve their own tasks. Only Administrator has approval privilege.');
        }
        const approver = body.approvedBy || userName || 'Administrator';
        return await this.model.findByIdAndUpdate(id, {
            approvalStatus: 'approved',
            approvedBy: approver,
            approvedAt: new Date(),
            rejectionReason: null
        }, { new: true }).exec();
    }
    async rejectTask(id, body, userRole) {
        const role = body.role || userRole || 'super_admin';
        if (role === 'lawyer') {
            throw new common_1.ForbiddenException('Lawyers cannot reject tasks. Only Administrator has approval privilege.');
        }
        return await this.model.findByIdAndUpdate(id, {
            approvalStatus: 'rejected',
            rejectionReason: body.reason || 'Rejected by administration review.'
        }, { new: true }).exec();
    }
    async update(id, updateDto) {
        return await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }
    async remove(id, userRole) {
        if (userRole === 'lawyer') {
            throw new common_1.ForbiddenException('Only Administrators have permission to delete tasks.');
        }
        return await this.model.findByIdAndDelete(id).exec();
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __param(2, (0, common_1.Headers)('x-user-name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pending-approvals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findPendingApprovals", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-user-role')),
    __param(3, (0, common_1.Headers)('x-user-name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "approveTask", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-user-role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "rejectTask", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "remove", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('api/v1/tasks'),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map