import { Model } from 'mongoose';
import { AuditLog } from './schemas/auditlog.schema';
export declare class AuditController {
    private readonly model;
    constructor(model: Model<AuditLog>);
    create(createDto: any): Promise<import("mongoose").Document<unknown, {}, AuditLog, {}, import("mongoose").DefaultSchemaOptions> & AuditLog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, AuditLog, {}, import("mongoose").DefaultSchemaOptions> & AuditLog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, AuditLog, {}, import("mongoose").DefaultSchemaOptions> & AuditLog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateDto: any): Promise<(import("mongoose").Document<unknown, {}, AuditLog, {}, import("mongoose").DefaultSchemaOptions> & AuditLog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, AuditLog, {}, import("mongoose").DefaultSchemaOptions> & AuditLog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
