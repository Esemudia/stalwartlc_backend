import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
export type CaseDocument = Case & Document;
export declare class CaseUpdate {
    date: string;
    title: string;
    description: string;
    author: string;
}
export declare class Case {
    caseNumber: string;
    title: string;
    type: string;
    status: string;
    attorney: string;
    uploadedBy: string;
    filedDate: string;
    nextHearing: string;
    description: string;
    clientName: string;
    clientId: User;
    court: string;
    claimValue: number;
    opposingParty: string;
    updates: CaseUpdate[];
}
export declare const CaseSchema: import("mongoose").Schema<Case, import("mongoose").Model<Case, any, any, any, any, any, Case>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Case, Document<unknown, {}, Case, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    caseNumber?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    attorney?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    uploadedBy?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    filedDate?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    nextHearing?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clientName?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clientId?: import("mongoose").SchemaDefinitionProperty<User, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    court?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    claimValue?: import("mongoose").SchemaDefinitionProperty<number, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    opposingParty?: import("mongoose").SchemaDefinitionProperty<string, Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    updates?: import("mongoose").SchemaDefinitionProperty<CaseUpdate[], Case, Document<unknown, {}, Case, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Case & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Case>;
