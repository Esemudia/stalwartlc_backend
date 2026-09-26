import { Model, Types } from 'mongoose';
import { VerificationRecord } from './schemas/verificationrecord.schema';
import { Matter } from '../matters/schemas/matter.schema';
import { AppDocument } from '../documents/schemas/document.schema';
import { Client } from '../clients/schemas/client.schema';
export declare class VerificationController {
    private readonly model;
    private readonly matterModel;
    private readonly documentModel;
    private readonly clientModel;
    constructor(model: Model<VerificationRecord>, matterModel: Model<Matter>, documentModel: Model<AppDocument>, clientModel: Model<Client>);
    create(createDto: any): Promise<import("mongoose").Document<unknown, {}, VerificationRecord, {}, import("mongoose").DefaultSchemaOptions> & VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, VerificationRecord, {}, import("mongoose").DefaultSchemaOptions> & VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    lookup(query: string): Promise<(import("mongoose").Document<unknown, {}, VerificationRecord, {}, import("mongoose").DefaultSchemaOptions> & VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, VerificationRecord, {}, import("mongoose").DefaultSchemaOptions> & VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    revoke(id: string, body: {
        reason?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, VerificationRecord, {}, import("mongoose").DefaultSchemaOptions> & VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateDto: any): Promise<(import("mongoose").Document<unknown, {}, VerificationRecord, {}, import("mongoose").DefaultSchemaOptions> & VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, VerificationRecord, {}, import("mongoose").DefaultSchemaOptions> & VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
