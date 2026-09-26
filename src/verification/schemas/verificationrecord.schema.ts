import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class VerificationRecord extends Document {
  @Prop({ required: true, unique: true }) verificationCode: string;
  @Prop({ type: Types.ObjectId, ref: 'AppDocument' }) documentId?: Types.ObjectId;
  @Prop() documentTitle?: string;
  @Prop() documentName?: string;
  @Prop() documentType?: string;
  @Prop({ type: Types.ObjectId, ref: 'Matter' }) matterId?: Types.ObjectId;
  @Prop() matterTitle?: string;
  @Prop({ type: Types.ObjectId, ref: 'Client' }) clientId?: Types.ObjectId;
  @Prop() clientName?: string;
  @Prop() hash?: string;
  @Prop({ default: 'valid' }) status: string; // 'valid' | 'revoked' | 'expired'
  @Prop({ type: Types.ObjectId, ref: 'User' }) issuedBy?: Types.ObjectId;
  @Prop() signatoryName?: string;
  @Prop() signatoryRole?: string;
  @Prop() jurisdiction?: string;
  @Prop({ default: Date.now }) issuedAt: Date;
  @Prop() expiresAt?: Date;
  @Prop() revokedAt?: Date;
  @Prop() revocationReason?: string;
  @Prop() notes?: string;
}

export const VerificationRecordSchema = SchemaFactory.createForClass(VerificationRecord);