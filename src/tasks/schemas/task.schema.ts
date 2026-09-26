import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskApprovalStatus = 'pending_approval' | 'approved' | 'rejected';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true }) title: string;
  @Prop() description?: string;
  @Prop({ type: Types.ObjectId, ref: 'Matter' }) matterId?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Client' }) clientId?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' }) assignedTo?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy?: Types.ObjectId;
  @Prop({ default: 'normal' }) priority: string;
  @Prop({ default: 'to_do' }) status: string;
  @Prop() dueDate?: Date;
  @Prop() completedAt?: Date;

  // ── Approval Workflow fields ──
  @Prop({ default: 'approved' }) approvalStatus: string; // 'pending_approval' | 'approved' | 'rejected'
  @Prop({ default: 'super_admin' }) creatorRole?: string;
  @Prop() creatorName?: string;
  @Prop() approvedBy?: string;
  @Prop() approvedAt?: Date;
  @Prop() rejectionReason?: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);