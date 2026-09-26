import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class DocumentVersion extends Document {
  @Prop({ type: Types.ObjectId, ref: 'AppDocument', required: true }) documentId: Types.ObjectId;
  @Prop({ required: true }) versionNumber: number;
  @Prop({ required: true }) fileName: string;
  @Prop({ required: true }) storageKey: string;
  @Prop({ required: true }) fileSize: number;
  @Prop({ required: true }) mimeType: string;
  @Prop() checksum?: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) uploadedBy: Types.ObjectId;
  @Prop() changeDescription?: string;
}

export const DocumentVersionSchema = SchemaFactory.createForClass(DocumentVersion);