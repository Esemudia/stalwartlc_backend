import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDoc, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'documents' })
export class AppDocument extends MongooseDoc {
  @Prop({ required: true, unique: true }) documentNumber: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) originalFileName: string;
  @Prop({ type: Types.ObjectId, ref: 'Client' }) clientId?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Matter' }) matterId?: Types.ObjectId;
  @Prop() category?: string;
  @Prop() description?: string;
  @Prop({ default: 1 }) currentVersion: number;
  @Prop({ default: 'draft' }) status: string;
  @Prop({ default: 'standard' }) confidentiality: string;
  @Prop({ type: [String], default: [] }) tags: string[];
  @Prop({ type: Types.ObjectId, ref: 'User' }) uploadedBy: Types.ObjectId;
  @Prop() fileUrl?: string;
  @Prop() filePath?: string;
}

export const AppDocumentSchema = SchemaFactory.createForClass(AppDocument);