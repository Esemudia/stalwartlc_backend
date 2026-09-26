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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createDto, headerRole) {
        const callerRole = createDto.callerRole || headerRole;
        if (callerRole === 'lawyer' || callerRole === 'client' || callerRole === 'front_desk') {
            throw new common_1.ForbiddenException('Only Administrators have permission to create new firm staff accounts.');
        }
        return await this.usersService.create(createDto);
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    async findOne(id) {
        return await this.usersService.findById(id);
    }
    async getFirmSettings() {
        return await this.usersService.getFirmSettings();
    }
    async updateFirmSettings(body, headerRole) {
        if (headerRole !== 'super_admin') {
            throw new common_1.ForbiddenException('Only Managing Partner / Super Administrator can modify firm configuration.');
        }
        return await this.usersService.updateFirmSettings(body);
    }
    async changePassword(id, body, headerRole, headerUserId) {
        if (headerRole === 'client') {
            throw new common_1.ForbiddenException('Clients do not have access to internal account settings.');
        }
        const isSuperAdmin = headerRole === 'super_admin';
        if (!isSuperAdmin && headerUserId && headerUserId !== id) {
            throw new common_1.ForbiddenException('You can only update your own password.');
        }
        return await this.usersService.changePassword(id, body.currentPassword, body.newPassword, isSuperAdmin);
    }
    async update(id, updateDto, headerRole, headerUserId, headerEmail) {
        const callerRole = updateDto.callerRole || headerRole;
        if (callerRole === 'client') {
            throw new common_1.ForbiddenException('Clients do not have permission to access firm settings or modify staff profiles.');
        }
        const isSuperAdmin = callerRole === 'super_admin';
        const isSelf = headerUserId === id || (updateDto.userId && updateDto.userId === id);
        if (!isSuperAdmin) {
            delete updateDto.role;
            delete updateDto.status;
            delete updateDto.roleIds;
            delete updateDto.callerRole;
        }
        return await this.usersService.update(id, updateDto);
    }
    async remove(id, headerRole) {
        if (headerRole === 'lawyer' || headerRole === 'client' || headerRole === 'front_desk') {
            throw new common_1.ForbiddenException('Only Administrators have permission to remove staff accounts.');
        }
        return await this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('settings/firm'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFirmSettings", null);
__decorate([
    (0, common_1.Patch)('settings/firm'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateFirmSettings", null);
__decorate([
    (0, common_1.Post)(':id/change-password'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-user-role')),
    __param(3, (0, common_1.Headers)('x-user-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-user-role')),
    __param(3, (0, common_1.Headers)('x-user-id')),
    __param(4, (0, common_1.Headers)('x-user-email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('api/v1/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map