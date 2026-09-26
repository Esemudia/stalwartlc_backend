import { Model, Types } from 'mongoose';
import { AppDocument } from './schemas/document.schema';
import { Matter } from '../matters/schemas/matter.schema';
import { User } from '../users/schemas/user.schema';
import { Response } from 'express';
export declare class DocumentsController {
    private documentModel;
    private matterModel;
    private userModel;
    constructor(documentModel: Model<AppDocument>, matterModel: Model<Matter>, userModel: Model<User>);
    private resolveLawyerUserIds;
    private resolveLawyerAssignedMatters;
    uploadFile(file: any, body: any, headerRole?: string, headerId?: string, headerEmail?: string, headerName?: string): Promise<import("mongoose").Document<unknown, {}, AppDocument, {}, import("mongoose").DefaultSchemaOptions> & AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    serveFile(filename: string, res: Response): void;
    create(createDto: any, headerRole?: string, headerId?: string, headerEmail?: string, headerName?: string): Promise<import("mongoose").Document<unknown, {}, AppDocument, {}, import("mongoose").DefaultSchemaOptions> & AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(headerRole?: string, headerId?: string, headerEmail?: string, headerName?: string): Promise<(import("mongoose").Document<unknown, {}, AppDocument, {}, import("mongoose").DefaultSchemaOptions> & AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string, headerRole?: string, headerId?: string, headerEmail?: string, headerName?: string): Promise<import("mongoose").Document<unknown, {}, AppDocument, {}, import("mongoose").DefaultSchemaOptions> & AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateDto: any): Promise<(import("mongoose").Document<unknown, {}, AppDocument, {}, import("mongoose").DefaultSchemaOptions> & AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string, headerRole?: string): Promise<(import("mongoose").Document<unknown, {}, AppDocument, {}, import("mongoose").DefaultSchemaOptions> & AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
