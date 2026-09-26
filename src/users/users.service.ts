import { Injectable, OnModuleInit, Logger, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

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

    async create(userDto: any): Promise<any> {
        const email = (userDto.email || '').trim().toLowerCase();
        if (!email) {
            throw new BadRequestException('Email address is required.');
        }

        const existing = await this.findByEmail(email);
        if (existing) {
            throw new ConflictException(`A user with email "${email}" already exists in the practice directory.`);
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
        const { passwordHash: _, ...result } = saved.toObject() as any;
        return result;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).select('-passwordHash').exec();
    }

    async update(id: string, updateDto: any): Promise<User | null> {
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

    async remove(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().select('-passwordHash').sort({ createdAt: -1 }).exec();
    }

    async changePassword(id: string, currentPassword?: string, newPassword?: string, isSuperAdmin = false): Promise<any> {
        if (!newPassword || newPassword.length < 6) {
            throw new BadRequestException('New password must be at least 6 characters long.');
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException('User account not found.');
        }

        if (!isSuperAdmin) {
            if (!currentPassword) {
                throw new BadRequestException('Current password is required to change your password.');
            }
            const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
            if (!isMatch) {
                throw new BadRequestException('Current password does not match.');
            }
        }

        user.passwordHash = await bcrypt.hash(newPassword, 10);
        await user.save();
        return { success: true, message: 'Password updated successfully.' };
    }

    async getFirmSettings(): Promise<any> {
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

    async updateFirmSettings(settingsDto: any): Promise<any> {
        const admin = await this.userModel.findOne({ role: 'super_admin' }).exec();
        if (!admin) {
            throw new NotFoundException('Administrator account not found to save firm settings.');
        }
        const current = admin.firmSettings || {};
        const updated = { ...current, ...settingsDto, updatedAt: new Date().toISOString() };
        admin.firmSettings = updated;
        admin.markModified('firmSettings');
        await admin.save();
        return updated;
    }
}
