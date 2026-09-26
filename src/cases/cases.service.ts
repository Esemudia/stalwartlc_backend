import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Case, CaseDocument } from './schemas/case.schema';

@Injectable()
export class CasesService {
    constructor(@InjectModel(Case.name) private caseModel: Model<CaseDocument>) { }

    async create(createDto: any): Promise<Case> {
        const createdCase = new this.caseModel(createDto);
        return createdCase.save();
    }

    async findAll(): Promise<Case[]> {
        return this.caseModel.find().exec();
    }

    async findByClientId(clientId: string): Promise<Case[]> {
        return this.caseModel.find({ clientId: clientId as any }).exec();
    }

    async findById(id: string): Promise<CaseDocument | null> {
        return this.caseModel.findById(id).exec();
    }
}
