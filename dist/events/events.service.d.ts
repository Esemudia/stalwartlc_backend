import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
export declare class EventsService {
    private readonly eventModel;
    private readonly logger;
    constructor(eventModel: Model<Event>);
    handleEventReminders(): Promise<void>;
}
