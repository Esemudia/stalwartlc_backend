import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Notification extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) recipientId: Types.ObjectId;
  @Prop({ required: true }) type: string;
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) message: string;
  @Prop() entityType?: string;
  @Prop({ type: Types.ObjectId }) entityId?: Types.ObjectId;
  @Prop({ default: false }) read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);