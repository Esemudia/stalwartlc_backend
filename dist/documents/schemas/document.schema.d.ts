import { Document as MongooseDoc, Types } from 'mongoose';
export declare class AppDocument extends MongooseDoc {
    documentNumber: string;
    name: string;
    originalFileName: string;
    clientId?: Types.ObjectId;
    matterId?: Types.ObjectId;
    category?: string;
    description?: string;
    currentVersion: number;
    status: string;
    confidentiality: string;
    tags: string[];
    uploadedBy: Types.ObjectId;
    fileUrl?: string;
    filePath?: string;
}
export declare const AppDocumentSchema: import("mongoose").Schema<AppDocument, import("mongoose").Model<AppDocument, any, any, any, any, any, AppDocument>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | undefined, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<string[], AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    uploadedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clientId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    documentNumber?: import("mongoose").SchemaDefinitionProperty<string, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    originalFileName?: import("mongoose").SchemaDefinitionProperty<string, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    matterId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string | undefined, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    currentVersion?: import("mongoose").SchemaDefinitionProperty<number, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    confidentiality?: import("mongoose").SchemaDefinitionProperty<string, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    fileUrl?: import("mongoose").SchemaDefinitionProperty<string | undefined, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    filePath?: import("mongoose").SchemaDefinitionProperty<string | undefined, AppDocument, MongooseDoc<unknown, {}, AppDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, AppDocument>;
