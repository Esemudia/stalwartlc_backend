import { Model, Types } from 'mongoose';
import { Matter } from './schemas/matter.schema';
import { User } from '../users/schemas/user.schema';
export declare class MattersController {
    private matterModel;
    private userModel;
    constructor(matterModel: Model<Matter>, userModel: Model<User>);
    private resolveLawyerUserIds;
    create(createMatterDto: any, headerRole?: string): Promise<import("mongoose").Document<unknown, {}, Matter, {}, import("mongoose").DefaultSchemaOptions> & Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(headerRole?: string, headerId?: string, headerEmail?: string, headerName?: string): Promise<(import("mongoose").Document<unknown, {}, Matter, {}, import("mongoose").DefaultSchemaOptions> & Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string, headerRole?: string, headerId?: string, headerEmail?: string, headerName?: string): Promise<import("mongoose").Document<unknown, {}, Matter, {}, import("mongoose").DefaultSchemaOptions> & Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateMatterDto: any): Promise<(import("mongoose").Document<unknown, {}, Matter, {}, import("mongoose").DefaultSchemaOptions> & Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    assignLawyers(id: string, assignDto: {
        lawyerIds: string[];
    }, headerRole?: string): Promise<(import("mongoose").Document<unknown, {}, Matter, {}, import("mongoose").DefaultSchemaOptions> & Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    closeMatter(id: string, headerRole?: string): Promise<(import("mongoose").Document<unknown, {}, Matter, {}, import("mongoose").DefaultSchemaOptions> & Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
