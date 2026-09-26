import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
export declare class EventsController {
    private readonly model;
    constructor(model: Model<Event>);
    create(createDto: any): Promise<import("mongoose").Document<unknown, {}, Event, {}, import("mongoose").DefaultSchemaOptions> & Event & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Event, {}, import("mongoose").DefaultSchemaOptions> & Event & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Event, {}, import("mongoose").DefaultSchemaOptions> & Event & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateDto: any): Promise<(import("mongoose").Document<unknown, {}, Event, {}, import("mongoose").DefaultSchemaOptions> & Event & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Event, {}, import("mongoose").DefaultSchemaOptions> & Event & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
