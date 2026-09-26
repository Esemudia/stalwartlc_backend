import { Model } from 'mongoose';
import { Role } from './schemas/role.schema';
export declare class RolesController {
    private readonly model;
    constructor(model: Model<Role>);
    create(createDto: any): Promise<import("mongoose").Document<unknown, {}, Role, {}, import("mongoose").DefaultSchemaOptions> & Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Role, {}, import("mongoose").DefaultSchemaOptions> & Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Role, {}, import("mongoose").DefaultSchemaOptions> & Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateDto: any): Promise<(import("mongoose").Document<unknown, {}, Role, {}, import("mongoose").DefaultSchemaOptions> & Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Role, {}, import("mongoose").DefaultSchemaOptions> & Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
