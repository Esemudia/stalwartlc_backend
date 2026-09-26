import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Case } from '../../cases/schemas/case.schema';
export type InvoiceDocument = Invoice & Document;
export declare class Invoice {
    invoiceNumber: string;
    clientId: User;
    caseId?: Case;
    amount: number;
    status: string;
    issuedDate: string;
    dueDate: string;
    description: string;
}
export declare const InvoiceSchema: import("mongoose").Schema<Invoice, import("mongoose").Model<Invoice, any, any, any, any, any, Invoice>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Invoice, Document<unknown, {}, Invoice, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Invoice & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    invoiceNumber?: import("mongoose").SchemaDefinitionProperty<string, Invoice, Document<unknown, {}, Invoice, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invoice & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clientId?: import("mongoose").SchemaDefinitionProperty<User, Invoice, Document<unknown, {}, Invoice, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invoice & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    caseId?: import("mongoose").SchemaDefinitionProperty<Case | undefined, Invoice, Document<unknown, {}, Invoice, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invoice & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    amount?: import("mongoose").SchemaDefinitionProperty<number, Invoice, Document<unknown, {}, Invoice, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invoice & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Invoice, Document<unknown, {}, Invoice, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invoice & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    issuedDate?: import("mongoose").SchemaDefinitionProperty<string, Invoice, Document<unknown, {}, Invoice, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invoice & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    dueDate?: import("mongoose").SchemaDefinitionProperty<string, Invoice, Document<unknown, {}, Invoice, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invoice & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Invoice, Document<unknown, {}, Invoice, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invoice & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Invoice>;
