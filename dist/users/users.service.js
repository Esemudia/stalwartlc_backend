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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcrypt");
let UsersService = UsersService_1 = class UsersService {
    userModel;
    logger = new common_1.Logger(UsersService_1.name);
    constructor(userModel) {
        this.userModel = userModel;
    }
    async onModuleInit() {
        const adminExists = await this.userModel.findOne({ role: 'super_admin' });
        if (!adminExists) {
            const passwordHash = await bcrypt.hash('admin1234', 10);
            await this.userModel.create({
                firstName: 'Super',
                lastName: 'Administrator',
                email: 'admin@stalwartlc.com',
                passwordHash: passwordHash,
                role: 'super_admin',
                status: 'active'
            });
            this.logger.log('Default super_admin seeded (admin@stalwartlc.com)');
        }
        const lawyerExists = await this.userModel.findOne({ email: 'c.stalwart@stalwartlc.com' });
        if (!lawyerExists) {
            const lawyerHash = await bcrypt.hash('stalwart2026', 10);
            await this.userModel.create({
                firstName: 'Chukwuemeka',
                lastName: 'Stalwart',
                email: 'c.stalwart@stalwartlc.com',
                passwordHash: lawyerHash,
                role: 'lawyer',
                status: 'active'
            });
            this.logger.log('Default demo lawyer seeded (c.stalwart@stalwartlc.com)');
        }
    }
    async create(userDto) {
        const email = (userDto.email || '').trim().toLowerCase();
        if (!email) {
            throw new common_1.BadRequestException('Email address is required.');
        }
        const existing = await this.findByEmail(email);
        if (existing) {
            throw new common_1.ConflictException(`A user with email "${email}" already exists in the practice directory.`);
        }
        const rawPassword = userDto.password || userDto.initialPassword || 'stalwart2026';
        const passwordHash = await bcrypt.hash(rawPassword, 10);
        const userData = {
            ...userDto,
            email,
            passwordHash,
            role: userDto.role || 'lawyer',
            status: userDto.status || 'active'
        };
        delete userData.password;
        delete userData.initialPassword;
        const createdUser = new this.userModel(userData);
        const saved = await createdUser.save();
        const { passwordHash: _, ...result } = saved.toObject();
        return result;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }
    async findById(id) {
        return this.userModel.findById(id).select('-passwordHash').exec();
    }
    async update(id, updateDto) {
        const payload = { ...updateDto };
        if (payload.password) {
            payload.passwordHash = await bcrypt.hash(payload.password, 10);
            delete payload.password;
        }
        if (payload.email) {
            payload.email = payload.email.trim().toLowerCase();
        }
        return this.userModel.findByIdAndUpdate(id, payload, { new: true }).select('-passwordHash').exec();
    }
    async remove(id) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
    async findAll() {
        return this.userModel.find().select('-passwordHash').sort({ createdAt: -1 }).exec();
    }
    async changePassword(id, currentPassword, newPassword, isSuperAdmin = false) {
        if (!newPassword || newPassword.length < 6) {
            throw new common_1.BadRequestException('New password must be at least 6 characters long.');
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException('User account not found.');
        }
        if (!isSuperAdmin) {
            if (!currentPassword) {
                throw new common_1.BadRequestException('Current password is required to change your password.');
            }
            const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
            if (!isMatch) {
                throw new common_1.BadRequestException('Current password does not match.');
            }
        }
        user.passwordHash = await bcrypt.hash(newPassword, 10);
        await user.save();
        return { success: true, message: 'Password updated successfully.' };
    }
    async getFirmSettings() {
        const admin = await this.userModel.findOne({ role: 'super_admin' }).exec();
        const defaultSettings = {
            firmName: 'Stalwart Law Consult',
            tagline: 'Barristers, Solicitors & Legal Arbitrators',
            email: 'contact@stalwartlc.com',
            phone: '+234 1 234 5678',
            address: 'Plot 12B, Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
            jurisdiction: 'Federal High Court & Appellate Courts of Nigeria',
            currency: 'NGN',
            cacNumber: 'RC-1049283',
            taxId: 'TIN-92810382-0001',
            logoUrl: ''
        };
        return admin?.firmSettings ? { ...defaultSettings, ...admin.firmSettings } : defaultSettings;
    }
    async updateFirmSettings(settingsDto) {
        const admin = await this.userModel.findOne({ role: 'super_admin' }).exec();
        if (!admin) {
            throw new common_1.NotFoundException('Administrator account not found to save firm settings.');
        }
        const current = admin.firmSettings || {};
        const updated = { ...current, ...settingsDto, updatedAt: new Date().toISOString() };
        admin.firmSettings = updated;
        admin.markModified('firmSettings');
        await admin.save();
        return updated;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map