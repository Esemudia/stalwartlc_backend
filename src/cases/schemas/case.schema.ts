import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/schemas/user.schema';

export type CaseDocument = Case & Document;

export class CaseUpdate {
    @ApiProperty()
    date: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    author: string;
}

@Schema({ timestamps: true })
export class Case {
    @ApiProperty()
    @Prop({ required: true, unique: true })
    caseNumber: string;

    @ApiProperty()
    @Prop({ required: true })
    title: string;

    @ApiProperty()
    @Prop({ required: true })
    type: string;

    @ApiProperty({ enum: ['active', 'pending', 'on_hold', 'closed'] })
    @Prop({ required: true, default: 'pending', enum: ['active', 'pending', 'on_hold', 'closed'] })
    status: string;

    @ApiProperty()
    @Prop()
    attorney: string;

    @ApiProperty()
    @Prop()
    uploadedBy: string;

    @ApiProperty()
    @Prop()
    filedDate: string;

    @ApiProperty()
    @Prop()
    nextHearing: string;

    @ApiProperty()
    @Prop()
    description: string;

    @ApiProperty()
    @Prop()
    clientName: string;

    @ApiProperty()
    @Prop({ type: Types.ObjectId, ref: 'User' })
    clientId: User;

    @ApiProperty()
    @Prop()
    court: string;

    @ApiProperty()
    @Prop()
    suitNumber: string;

    @ApiProperty()
    @Prop()
    claimValue: number;

    @ApiProperty()
    @Prop()
    opposingParty: string;

    @ApiProperty({ type: [CaseUpdate] })
    @Prop({ type: [Object], default: [] })
    updates: CaseUpdate[];
}

export const CaseSchema = SchemaFactory.createForClass(Case);
