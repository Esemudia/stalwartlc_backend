import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createDto: any, headerRole?: string): Promise<any>;
    findAll(): Promise<import("./schemas/user.schema").User[]>;
    findOne(id: string): Promise<import("./schemas/user.schema").User | null>;
    getFirmSettings(): Promise<any>;
    updateFirmSettings(body: any, headerRole?: string): Promise<any>;
    changePassword(id: string, body: any, headerRole?: string, headerUserId?: string): Promise<any>;
    update(id: string, updateDto: any, headerRole?: string, headerUserId?: string, headerEmail?: string): Promise<import("./schemas/user.schema").User | null>;
    remove(id: string, headerRole?: string): Promise<import("./schemas/user.schema").User | null>;
}
