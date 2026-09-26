import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UsersService implements OnModuleInit {
    private userModel;
    private readonly logger;
    constructor(userModel: Model<User>);
    onModuleInit(): Promise<void>;
    create(userDto: any): Promise<any>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(id: string, updateDto: any): Promise<User | null>;
    remove(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    changePassword(id: string, currentPassword?: string, newPassword?: string, isSuperAdmin?: boolean): Promise<any>;
    getFirmSettings(): Promise<any>;
    updateFirmSettings(settingsDto: any): Promise<any>;
}
