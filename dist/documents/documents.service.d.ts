import { Model } from 'mongoose';
import { AppDocument } from './schemas/document.schema';
export declare class DocumentsService {
    private docModel;
    constructor(docModel: Model<AppDocument>);
    create(createDto: any): Promise<AppDocument>;
    findByCaseId(caseId: string): Promise<AppDocument[]>;
}
