import { Model, Types } from 'mongoose';
import { Client } from './schemas/client.schema';
export declare class ClientsController {
    private clientModel;
    constructor(clientModel: Model<Client>);
    create(createClientDto: any): Promise<import("mongoose").Document<unknown, {}, Client, {}, import("mongoose").DefaultSchemaOptions> & Client & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Client, {}, import("mongoose").DefaultSchemaOptions> & Client & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    loginClient(credentials: {
        email: string;
        clientNumber: string;
    }): Promise<import("mongoose").Document<unknown, {}, Client, {}, import("mongoose").DefaultSchemaOptions> & Client & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Client, {}, import("mongoose").DefaultSchemaOptions> & Client & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateClientDto: any): Promise<(import("mongoose").Document<unknown, {}, Client, {}, import("mongoose").DefaultSchemaOptions> & Client & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    archive(id: string): Promise<(import("mongoose").Document<unknown, {}, Client, {}, import("mongoose").DefaultSchemaOptions> & Client & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
