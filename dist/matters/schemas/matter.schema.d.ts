import { Document, Types } from 'mongoose';
export declare const COURTS: readonly ["State High Court", "Federal High Court", "Court of Appeal", "Supreme Court"];
export type CourtName = typeof COURTS[number];
export declare class Matter extends Document {
    matterNumber: string;
    title: string;
    clientId: Types.ObjectId;
    description?: string;
    matterType?: string;
    suitNumber?: string;
    courtName?: string;
    status: string;
    priority: string;
    assignedPartnerId?: Types.ObjectId;
    assignedLawyerIds: Types.ObjectId[];
    paralegalIds: Types.ObjectId[];
    court?: {
        name?: string;
        suitNumber?: string;
        caseNumber?: string;
        location?: string;
        judge?: string;
        division?: string;
    };
    opposingParty?: string;
    opposingCounsel?: string;
    importantDates?: {
        filingDate?: Date;
        nextCourtDate?: Date;
        deadline?: Date;
    };
    openedAt: Date;
    closedAt?: Date;
    createdBy: Types.ObjectId;
}
export declare const MatterSchema: import("mongoose").Schema<Matter, import("mongoose").Model<Matter, any, any, any, any, any, Matter>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Matter, Document<unknown, {}, Matter, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | undefined, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clientId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    court?: import("mongoose").SchemaDefinitionProperty<{
        name?: string;
        suitNumber?: string;
        caseNumber?: string;
        location?: string;
        judge?: string;
        division?: string;
    } | undefined, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    suitNumber?: import("mongoose").SchemaDefinitionProperty<string | undefined, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    opposingParty?: import("mongoose").SchemaDefinitionProperty<string | undefined, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    matterNumber?: import("mongoose").SchemaDefinitionProperty<string, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    matterType?: import("mongoose").SchemaDefinitionProperty<string | undefined, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    courtName?: import("mongoose").SchemaDefinitionProperty<string | undefined, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    priority?: import("mongoose").SchemaDefinitionProperty<string, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    assignedPartnerId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    assignedLawyerIds?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    paralegalIds?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    opposingCounsel?: import("mongoose").SchemaDefinitionProperty<string | undefined, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    importantDates?: import("mongoose").SchemaDefinitionProperty<{
        filingDate?: Date;
        nextCourtDate?: Date;
        deadline?: Date;
    } | undefined, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    openedAt?: import("mongoose").SchemaDefinitionProperty<Date, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    closedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Matter, Document<unknown, {}, Matter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Matter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Matter>;
