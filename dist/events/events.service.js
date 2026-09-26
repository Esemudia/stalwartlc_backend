"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EventsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const event_schema_1 = require("./schemas/event.schema");
let EventsService = EventsService_1 = class EventsService {
    eventModel;
    logger = new common_1.Logger(EventsService_1.name);
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async handleEventReminders() {
        this.logger.log('Running automated check for upcoming Calendar Events...');
        const now = new Date();
        const events = await this.eventModel.find({ startDate: { $gt: now } }).exec();
        for (const ev of events) {
            if (!ev.reminders || ev.reminders.length === 0)
                continue;
            const timeToEventMs = new Date(ev.startDate).getTime() - now.getTime();
            const minutesToEvent = Math.floor(timeToEventMs / 60000);
            for (const reminder of ev.reminders) {
                if (minutesToEvent <= reminder.minutesBefore && minutesToEvent > reminder.minutesBefore - 5) {
                    this.logger.log(`[REMINDER DISPATCHED] Event: "${ev.title}" is in ${minutesToEvent} minutes. (Case ID: ${ev.matterId})`);
                }
            }
        }
    }
};
exports.EventsService = EventsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventsService.prototype, "handleEventReminders", null);
exports.EventsService = EventsService = EventsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_schema_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventsService);
//# sourceMappingURL=events.service.js.map