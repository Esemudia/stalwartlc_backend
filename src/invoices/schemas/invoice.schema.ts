import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/schemas/user.schema';
import { Case } from '../../cases/schemas/case.schema';

export type InvoiceDocument = Invoice & Document;

@Schema({ timestamps: true })
export class Invoice {
    @ApiProperty()
    @Prop({ required: true, unique: true })
    invoiceNumber: string;

    @ApiProperty()
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    clientId: User;

    @ApiProperty()
    @Prop({ type: Types.ObjectId, ref: 'Case' })
    caseId?: Case;

    @ApiProperty()
    @Prop({ required: true })
    amount: number;

    @ApiProperty({ enum: ['paid', 'pending', 'overdue'] })
    @Prop({ required: true, default: 'pending', enum: ['paid', 'pending', 'overdue'] })
    status: string;

    @ApiProperty()
    @Prop({ required: true })
    issuedDate: string;

    @ApiProperty()
    @Prop({ required: true })
    dueDate: string;

    @ApiProperty()
    @Prop()
    description: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
