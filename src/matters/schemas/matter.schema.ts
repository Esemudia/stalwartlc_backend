import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export const COURTS = [
  'State High Court',
  'Federal High Court',
  'Court of Appeal',
  'Supreme Court',
] as const;
export type CourtName = typeof COURTS[number];

@Schema({ timestamps: true })
export class Matter extends Document {
  @Prop({ required: true, unique: true }) matterNumber: string;
  @Prop({ required: true }) title: string;
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true }) clientId: Types.ObjectId;
  @Prop() description?: string;
  @Prop({ default: 'Litigation' }) matterType?: string;
  @Prop() suitNumber?: string;
  @Prop({ enum: [...COURTS, ''] }) courtName?: string;
  @Prop({ default: 'active' }) status: string;
  @Prop({ default: 'normal' }) priority: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) assignedPartnerId?: Types.ObjectId;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) assignedLawyerIds: Types.ObjectId[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) paralegalIds: Types.ObjectId[];
  @Prop({ type: Object }) court?: { name?: string, suitNumber?: string, caseNumber?: string, location?: string, judge?: string, division?: string };
  @Prop() opposingParty?: string;
  @Prop() opposingCounsel?: string;
  @Prop({ type: Object }) importantDates?: { filingDate?: Date, nextCourtDate?: Date, deadline?: Date };
  @Prop({ default: Date.now }) openedAt: Date;
  @Prop() closedAt?: Date;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}

export const MatterSchema = SchemaFactory.createForClass(Matter);