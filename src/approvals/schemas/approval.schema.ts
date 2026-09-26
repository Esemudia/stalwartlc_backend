import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Approval extends Document {
  @Prop({ type: Types.ObjectId, ref: 'AppDocument', required: true }) documentId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) requestedBy: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) assignedReviewerId: Types.ObjectId;
  @Prop({ default: 'pending' }) status: string;
  @Prop({ type: [String] }) comments?: string[];
  @Prop({ default: Date.now }) requestedAt: Date;
  @Prop() reviewedAt?: Date;
  @Prop({ type: Types.ObjectId, ref: 'User' }) reviewedBy?: Types.ObjectId;
}

export const ApprovalSchema = SchemaFactory.createForClass(Approval);