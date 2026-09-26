import { Document, Types } from 'mongoose';
export declare class VerificationRecord extends Document {
    verificationCode: string;
    documentId?: Types.ObjectId;
    documentTitle?: string;
    documentName?: string;
    documentType?: string;
    matterId?: Types.ObjectId;
    matterTitle?: string;
    clientId?: Types.ObjectId;
    clientName?: string;
    hash?: string;
    status: string;
    issuedBy?: Types.ObjectId;
    signatoryName?: string;
    signatoryRole?: string;
    jurisdiction?: string;
    issuedAt: Date;
    expiresAt?: Date;
    revokedAt?: Date;
    revocationReason?: string;
    notes?: string;
}
export declare const VerificationRecordSchema: import("mongoose").Schema<VerificationRecord, import("mongoose").Model<VerificationRecord, any, any, any, any, any, VerificationRecord>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VerificationRecord, Document<unknown, {}, VerificationRecord, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clientName?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clientId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    matterId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    documentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    verificationCode?: import("mongoose").SchemaDefinitionProperty<string, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    documentTitle?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    documentName?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    documentType?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    matterTitle?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    hash?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    issuedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    signatoryName?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    signatoryRole?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    jurisdiction?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    issuedAt?: import("mongoose").SchemaDefinitionProperty<Date, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    revokedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    revocationReason?: import("mongoose").SchemaDefinitionProperty<string | undefined, VerificationRecord, Document<unknown, {}, VerificationRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRecord & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, VerificationRecord>;
