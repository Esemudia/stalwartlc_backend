const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const schemas = {
  'users': {
    name: 'User',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true }) firstName: string;
    @Prop({ required: true }) lastName: string;
    @Prop({ required: true, unique: true }) email: string;
    @Prop() phone?: string;
    @Prop({ required: true }) passwordHash: string;
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Role' }] }) roleIds: Types.ObjectId[];
    @Prop() department?: string;
    @Prop({ default: 'active' }) status: string;
    @Prop() avatarUrl?: string;
    @Prop() lastLoginAt?: Date;
    @Prop({ default: false }) twoFactorEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
\
  },
  'roles': {
    name: 'Role',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
    @Prop({ required: true, unique: true }) name: string;
    @Prop() description?: string;
    @Prop({ type: [String], default: [] }) permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
\
  },
  'clients': {
    name: 'Client',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
    @Prop({ required: true, unique: true }) clientNumber: string;
    @Prop({ required: true, enum: ['individual', 'corporate'] }) type: string;
    @Prop() firstName?: string;
    @Prop() lastName?: string;
    @Prop() companyName?: string;
    @Prop({ required: true, unique: true }) email: string;
    @Prop() phone?: string;
    @Prop({ type: Object }) address?: { street?: string, city?: string, state?: string, country?: string };
    @Prop({ type: Object }) identification?: { type?: string, number?: string, documentUrl?: string };
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) assignedLawyers: Types.ObjectId[];
    @Prop({ default: 'active' }) status: string;
    @Prop() notes?: string;
    @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
\
  },
  'matters': {
    name: 'Matter',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MatterDocument = Matter & Document;

@Schema({ timestamps: true })
export class Matter {
    @Prop({ required: true, unique: true }) matterNumber: string;
    @Prop({ required: true }) title: string;
    @Prop({ type: Types.ObjectId, ref: 'Client', required: true }) clientId: Types.ObjectId;
    @Prop() description?: string;
    @Prop() matterType?: string;
    @Prop({ default: 'active' }) status: string;
    @Prop({ default: 'normal' }) priority: string;
    @Prop({ type: Types.ObjectId, ref: 'User' }) assignedPartnerId?: Types.ObjectId;
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) assignedLawyerIds: Types.ObjectId[];
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) paralegalIds: Types.ObjectId[];
    @Prop({ type: Object }) court?: { name?: string, caseNumber?: string, location?: string, judge?: string };
    @Prop() opposingParty?: string;
    @Prop() opposingCounsel?: string;
    @Prop({ type: Object }) importantDates?: { filingDate?: Date, nextCourtDate?: Date, deadline?: Date };
    @Prop({ default: Date.now }) openedAt: Date;
    @Prop() closedAt?: Date;
    @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}

export const MatterSchema = SchemaFactory.createForClass(Matter);
\
  },
  'documents': {
    name: 'AppDocument',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDoc, Types } from 'mongoose';

export type AppDocumentDocument = AppDocument & MongooseDoc;

@Schema({ timestamps: true, collection: 'documents' })
export class AppDocument {
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
}

export const AppDocumentSchema = SchemaFactory.createForClass(AppDocument);
\
  },
  'documents': {
    name: 'DocumentVersion',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DocumentVersionDocument = DocumentVersion & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class DocumentVersion {
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
\,
    subfolder: 'document-versions'
  },
  'approvals': {
    name: 'Approval',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApprovalDocument = Approval & Document;

@Schema({ timestamps: true })
export class Approval {
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
\
  },
  'tasks': {
    name: 'Task',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
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
}

export const TaskSchema = SchemaFactory.createForClass(Task);
\
  },
  'events': {
    name: 'Event',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
    @Prop({ required: true }) title: string;
    @Prop() type?: string;
    @Prop({ type: Types.ObjectId, ref: 'Matter' }) matterId?: Types.ObjectId;
    @Prop({ type: Types.ObjectId, ref: 'Client' }) clientId?: Types.ObjectId;
    @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy?: Types.ObjectId;
    @Prop({ required: true }) startDate: Date;
    @Prop({ required: true }) endDate: Date;
    @Prop() location?: string;
    @Prop() description?: string;
    @Prop({ type: [{ minutesBefore: Number }] }) reminders?: { minutesBefore: number }[];
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) attendees: Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
\
  },
  'notifications': {
    name: 'Notification',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Notification {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true }) recipientId: Types.ObjectId;
    @Prop({ required: true }) type: string;
    @Prop({ required: true }) title: string;
    @Prop({ required: true }) message: string;
    @Prop() entityType?: string;
    @Prop({ type: Types.ObjectId }) entityId?: Types.ObjectId;
    @Prop({ default: false }) read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
\
  },
  'audit': {
    name: 'AuditLog',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class AuditLog {
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
\
  },
  'verification': {
    name: 'VerificationRecord',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VerificationRecordDocument = VerificationRecord & Document;

@Schema({ timestamps: true })
export class VerificationRecord {
    @Prop({ required: true, unique: true }) verificationCode: string;
    @Prop({ type: Types.ObjectId, ref: 'AppDocument', required: true }) documentId: Types.ObjectId;
    @Prop() documentType?: string;
    @Prop({ default: 'valid' }) status: string;
    @Prop({ type: Types.ObjectId, ref: 'User' }) issuedBy?: Types.ObjectId;
    @Prop({ default: Date.now }) issuedAt: Date;
    @Prop() expiresAt?: Date;
    @Prop() revokedAt?: Date;
    @Prop() revocationReason?: string;
}

export const VerificationRecordSchema = SchemaFactory.createForClass(VerificationRecord);
\
  },
  'communications': {
    name: 'Message',
    content: \import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Message {
    @Prop({ type: Types.ObjectId, ref: 'Matter' }) matterId?: Types.ObjectId;
    @Prop({ type: Types.ObjectId, ref: 'Client' }) clientId?: Types.ObjectId;
    @Prop({ type: Types.ObjectId, ref: 'User', required: true }) senderId: Types.ObjectId;
    @Prop({ type: Types.ObjectId, ref: 'User', required: true }) recipientId: Types.ObjectId;
    @Prop({ required: true }) message: string;
    @Prop({ type: [{ type: Types.ObjectId, ref: 'AppDocument' }] }) attachments?: Types.ObjectId[];
    @Prop() readAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
\
  }
};

for (const [mod, data] of Object.entries(schemas)) {
  const modDir = path.join(srcDir, mod);
  if (!fs.existsSync(modDir)) fs.mkdirSync(modDir, { recursive: true });
  
  let schemaDir = path.join(modDir, 'schemas');
  if (data.subfolder) {
     schemaDir = path.join(srcDir, data.subfolder, 'schemas');
     if (!fs.existsSync(path.join(srcDir, data.subfolder))) fs.mkdirSync(path.join(srcDir, data.subfolder));
  }
  if (!fs.existsSync(schemaDir)) fs.mkdirSync(schemaDir, { recursive: true });
  
  const schemaFile = path.join(schemaDir, data.name.toLowerCase() + '.schema.ts');
  fs.writeFileSync(schemaFile, data.content);
  console.log('Created ' + schemaFile);
}
