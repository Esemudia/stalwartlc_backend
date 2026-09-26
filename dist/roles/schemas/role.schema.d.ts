import { Document } from 'mongoose';
export declare class Role extends Document {
    name: string;
    description?: string;
    permissions: string[];
}
export declare const RoleSchema: import("mongoose").Schema<Role, import("mongoose").Model<Role, any, any, any, any, any, Role>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Role, Document<unknown, {}, Role, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Role & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Role, Document<unknown, {}, Role, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Role, Document<unknown, {}, Role, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | undefined, Role, Document<unknown, {}, Role, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    permissions?: import("mongoose").SchemaDefinitionProperty<string[], Role, Document<unknown, {}, Role, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Role>;
