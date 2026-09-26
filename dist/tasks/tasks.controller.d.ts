import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
export declare class TasksController {
    private readonly model;
    constructor(model: Model<Task>);
    create(createDto: any, headerRole?: string, headerName?: string): Promise<import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findPendingApprovals(): Promise<(import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    approveTask(id: string, body: any, userRole?: string, userName?: string): Promise<(import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    rejectTask(id: string, body: any, userRole?: string): Promise<(import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateDto: any): Promise<(import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string, userRole?: string): Promise<(import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
