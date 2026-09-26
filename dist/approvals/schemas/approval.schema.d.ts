import { Document, Types } from 'mongoose';
export declare class Approval extends Document {
    documentId: Types.ObjectId;
    requestedBy: Types.ObjectId;
    assignedReviewerId: Types.ObjectId;
    status: string;
    comments?: string[];
    requestedAt: Date;
    reviewedAt?: Date;
    reviewedBy?: Types.ObjectId;
}
export declare const ApprovalSchema: import("mongoose").Schema<Approval, import("mongoose").Model<Approval, any, any, any, any, any, Approval>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Approval, Document<unknown, {}, Approval, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Approval & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Approval, Document<unknown, {}, Approval, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Approval & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Approval, Document<unknown, {}, Approval, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Approval & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    documentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Approval, Document<unknown, {}, Approval, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Approval & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    requestedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Approval, Document<unknown, {}, Approval, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Approval & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    assignedReviewerId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Approval, Document<unknown, {}, Approval, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Approval & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    comments?: import("mongoose").SchemaDefinitionProperty<string[] | undefined, Approval, Document<unknown, {}, Approval, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Approval & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    requestedAt?: import("mongoose").SchemaDefinitionProperty<Date, Approval, Document<unknown, {}, Approval, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Approval & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    reviewedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Approval, Document<unknown, {}, Approval, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Approval & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    reviewedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Approval, Document<unknown, {}, Approval, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Approval & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Approval>;
