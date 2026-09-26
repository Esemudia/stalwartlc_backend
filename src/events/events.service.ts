import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventsService {
    private readonly logger = new Logger(EventsService.name);

    constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) { }

    // Runs every 5 minutes to check for upcoming events
    @Cron(CronExpression.EVERY_5_MINUTES)
    async handleEventReminders() {
        this.logger.log('Running automated check for upcoming Calendar Events...');

        const now = new Date();
        const events = await this.eventModel.find({ startDate: { $gt: now } }).exec();

        for (const ev of events) {
            if (!ev.reminders || ev.reminders.length === 0) continue;

            const timeToEventMs = new Date(ev.startDate).getTime() - now.getTime();
            const minutesToEvent = Math.floor(timeToEventMs / 60000);

            for (const reminder of ev.reminders) {
                // Check if the event is occurring closely around the reminder threshold 
                // We use a 5-minute jitter window since this cron runs strictly every 5 mins.
                if (minutesToEvent <= reminder.minutesBefore && minutesToEvent > reminder.minutesBefore - 5) {
                    this.logger.log(`[REMINDER DISPATCHED] Event: "${ev.title}" is in ${minutesToEvent} minutes. (Case ID: ${ev.matterId})`);
                    // In a full production system, we would inject NotificationsService or EmailService here 
                    // and fire an SMS/Email to the 'attendees' or 'clientId'.
                }
            }
        }
    }
}
