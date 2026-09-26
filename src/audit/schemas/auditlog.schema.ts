import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class AuditLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) userId: Types.ObjectId;
  @Prop({ required: true }) action: string;
  @Prop() entityType?: string;
  @Prop({ type: Types.ObjectId }) entityId?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Matter' }) matterId?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Client' }) clientId?: Types.ObjectId;
  @Prop({ type: Object }) metadata?: any;
  @Prop() ipAddress?: string;
  @Prop() userAgent?: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);