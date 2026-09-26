import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Client extends Document {
  @Prop({ required: true, unique: true }) clientNumber: string;
  @Prop({ required: true, enum: ['individual', 'corporate'] }) type: string;
  @Prop() firstName?: string;
  @Prop() lastName?: string;
  @Prop() companyName?: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop() phone?: string;
  @Prop({ type: Object }) address?: { street?: string, city?: string, state?: string, country?: string };
  @Prop({ type: Object }) representative?: { name?: string, phone?: string, email?: string, position?: string };
  @Prop({ type: Object }) identification?: { type?: string, number?: string, documentUrl?: string };
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) assignedLawyers: Types.ObjectId[];
  @Prop({ default: 'active' }) status: string;
  @Prop() notes?: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);