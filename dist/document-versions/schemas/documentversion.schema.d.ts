import { Document, Types } from 'mongoose';
export declare class DocumentVersion extends Document {
    documentId: Types.ObjectId;
    versionNumber: number;
    fileName: string;
    storageKey: string;
    fileSize: number;
    mimeType: string;
    checksum?: string;
    uploadedBy: Types.ObjectId;
    changeDescription?: string;
}
export declare const DocumentVersionSchema: import("mongoose").Schema<DocumentVersion, import("mongoose").Model<DocumentVersion, any, any, any, any, any, DocumentVersion>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DocumentVersion, Document<unknown, {}, DocumentVersion, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DocumentVersion, Document<unknown, {}, DocumentVersion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    uploadedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DocumentVersion, Document<unknown, {}, DocumentVersion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    documentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DocumentVersion, Document<unknown, {}, DocumentVersion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    versionNumber?: import("mongoose").SchemaDefinitionProperty<number, DocumentVersion, Document<unknown, {}, DocumentVersion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    fileName?: import("mongoose").SchemaDefinitionProperty<string, DocumentVersion, Document<unknown, {}, DocumentVersion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    storageKey?: import("mongoose").SchemaDefinitionProperty<string, DocumentVersion, Document<unknown, {}, DocumentVersion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    fileSize?: import("mongoose").SchemaDefinitionProperty<number, DocumentVersion, Document<unknown, {}, DocumentVersion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    mimeType?: import("mongoose").SchemaDefinitionProperty<string, DocumentVersion, Document<unknown, {}, DocumentVersion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    checksum?: import("mongoose").SchemaDefinitionProperty<string | undefined, DocumentVersion, Document<unknown, {}, DocumentVersion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    changeDescription?: import("mongoose").SchemaDefinitionProperty<string | undefined, DocumentVersion, Document<unknown, {}, DocumentVersion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentVersion & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, DocumentVersion>;
