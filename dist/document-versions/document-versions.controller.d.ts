import { Model } from 'mongoose';
import { DocumentVersion } from './schemas/documentversion.schema';
export declare class DocumentVersionsController {
    private readonly model;
    constructor(model: Model<DocumentVersion>);
    create(createDto: any): Promise<import("mongoose").Document<unknown, {}, DocumentVersion, {}, import("mongoose").DefaultSchemaOptions> & DocumentVersion & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, DocumentVersion, {}, import("mongoose").DefaultSchemaOptions> & DocumentVersion & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, DocumentVersion, {}, import("mongoose").DefaultSchemaOptions> & DocumentVersion & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateDto: any): Promise<(import("mongoose").Document<unknown, {}, DocumentVersion, {}, import("mongoose").DefaultSchemaOptions> & DocumentVersion & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, DocumentVersion, {}, import("mongoose").DefaultSchemaOptions> & DocumentVersion & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
