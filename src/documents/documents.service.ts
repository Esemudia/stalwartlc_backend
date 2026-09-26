import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppDocument } from './schemas/document.schema';

@Injectable()
export class DocumentsService {
    constructor(@InjectModel(AppDocument.name) private docModel: Model<AppDocument>) { }

    async create(createDto: any): Promise<AppDocument> {
        const doc = new this.docModel(createDto);
        return doc.save();
    }

    async findByCaseId(caseId: string): Promise<AppDocument[]> {
        return this.docModel.find({ caseId: caseId as any }).exec();
    }
}
