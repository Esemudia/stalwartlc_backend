import { Model } from 'mongoose';
import { Case, CaseDocument } from './schemas/case.schema';
export declare class CasesService {
    private caseModel;
    constructor(caseModel: Model<CaseDocument>);
    create(createDto: any): Promise<Case>;
    findAll(): Promise<Case[]>;
    findByClientId(clientId: string): Promise<Case[]>;
    findById(id: string): Promise<CaseDocument | null>;
}
