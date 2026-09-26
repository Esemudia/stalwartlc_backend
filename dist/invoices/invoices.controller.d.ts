import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from './schemas/invoice.schema';
export declare class InvoicesController {
    private invoiceModel;
    constructor(invoiceModel: Model<InvoiceDocument>);
    create(createDto: any): Promise<import("mongoose").Document<unknown, {}, InvoiceDocument, {}, import("mongoose").DefaultSchemaOptions> & Invoice & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(req: any): Promise<(import("mongoose").Document<unknown, {}, InvoiceDocument, {}, import("mongoose").DefaultSchemaOptions> & Invoice & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, InvoiceDocument, {}, import("mongoose").DefaultSchemaOptions> & Invoice & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateDto: any): Promise<(import("mongoose").Document<unknown, {}, InvoiceDocument, {}, import("mongoose").DefaultSchemaOptions> & Invoice & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, InvoiceDocument, {}, import("mongoose").DefaultSchemaOptions> & Invoice & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    pay(id: string): Promise<{
        error: string;
        success?: undefined;
        message?: undefined;
        invoice?: undefined;
    } | {
        success: boolean;
        message: string;
        invoice: import("mongoose").Document<unknown, {}, InvoiceDocument, {}, import("mongoose").DefaultSchemaOptions> & Invoice & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        error?: undefined;
    }>;
}
