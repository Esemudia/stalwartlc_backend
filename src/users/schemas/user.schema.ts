import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true }) firstName: string;
  @Prop({ required: true }) lastName: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop() phone?: string;
  @Prop({ required: true }) passwordHash: string;
  @Prop({ default: 'client' }) role: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Role' }] }) roleIds: Types.ObjectId[];
  @Prop() department?: string;
  @Prop() title?: string;
  @Prop() barNumber?: string;
  @Prop() bio?: string;
  @Prop({ default: 'active' }) status: string;
  @Prop() avatarUrl?: string;
  @Prop() lastLoginAt?: Date;
  @Prop({ default: false }) twoFactorEnabled: boolean;
  @Prop({ type: Object }) notificationPreferences?: Record<string, boolean>;
  @Prop({ type: Object }) firmSettings?: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);