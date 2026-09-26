import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true }) title: string;
  @Prop() type?: string;
  @Prop({ type: Types.ObjectId, ref: 'Matter' }) matterId?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Client' }) clientId?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy?: Types.ObjectId;
  @Prop({ required: true }) startDate: Date;
  @Prop({ required: true }) endDate: Date;
  @Prop() location?: string;
  @Prop() description?: string;
  @Prop({ type: [{ minutesBefore: Number }] }) reminders?: { minutesBefore: number }[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) attendees: Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);