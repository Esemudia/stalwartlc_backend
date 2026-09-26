import { Document, Types } from 'mongoose';
export declare class Event extends Document {
    title: string;
    type?: string;
    matterId?: Types.ObjectId;
    clientId?: Types.ObjectId;
    createdBy?: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    location?: string;
    description?: string;
    reminders?: {
        minutesBefore: number;
    }[];
    attendees: Types.ObjectId[];
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, any, any, Event>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, Document<unknown, {}, Event, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string | undefined, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | undefined, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clientId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string | undefined, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    matterId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    reminders?: import("mongoose").SchemaDefinitionProperty<{
        minutesBefore: number;
    }[] | undefined, Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    attendees?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Event, Document<unknown, {}, Event, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Event & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Event>;
