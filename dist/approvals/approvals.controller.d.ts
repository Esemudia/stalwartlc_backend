import { Model } from 'mongoose';
import { Approval } from './schemas/approval.schema';
export declare class ApprovalsController {
    private readonly model;
    constructor(model: Model<Approval>);
    create(createDto: any): Promise<import("mongoose").Document<unknown, {}, Approval, {}, import("mongoose").DefaultSchemaOptions> & Approval & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Approval, {}, import("mongoose").DefaultSchemaOptions> & Approval & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Approval, {}, import("mongoose").DefaultSchemaOptions> & Approval & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateDto: any): Promise<(import("mongoose").Document<unknown, {}, Approval, {}, import("mongoose").DefaultSchemaOptions> & Approval & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Approval, {}, import("mongoose").DefaultSchemaOptions> & Approval & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
