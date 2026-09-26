import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop() subject?: string;
  @Prop() from?: string;
  @Prop() senderName?: string;
  @Prop() to?: string;
  @Prop() recipientName?: string;
  @Prop({ type: [String], default: [] }) cc?: string[];
  @Prop({ type: [String], default: [] }) bcc?: string[];
  @Prop() body?: string;
  @Prop() message?: string; // backwards compatibility
  @Prop({ default: 'inbound' }) direction: string; // 'inbound' | 'outbound'
  @Prop({ default: 'received' }) status: string; // 'received' | 'sent' | 'draft'
  @Prop({ type: Types.ObjectId, ref: 'Matter' }) matterId?: Types.ObjectId;
  @Prop() matterTitle?: string;
  @Prop({ type: Types.ObjectId, ref: 'Client' }) clientId?: Types.ObjectId;
  @Prop() clientName?: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) senderId?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' }) recipientId?: Types.ObjectId;
  @Prop({ type: [Object], default: [] }) attachments?: any[]; // { name, size, type, url }
  @Prop({ default: false }) isStarred?: boolean;
  @Prop({ default: false }) isRead?: boolean;
  @Prop() readAt?: Date;
  @Prop({ default: 'mail.stalwartlc.com' }) mxServer?: string;
  @Prop() messageId?: string;
  @Prop() threadId?: string;
  @Prop({ default: 'email' }) channel?: string; // 'email' | 'chat'
  @Prop() senderAvatar?: string;
  @Prop() senderRole?: string;
  @Prop() sentAt?: Date;
  @Prop({ default: Date.now }) receivedAt?: Date;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);