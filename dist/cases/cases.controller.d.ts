import { CasesService } from './cases.service';
export declare class CasesController {
    private casesService;
    constructor(casesService: CasesService);
    create(createCaseDto: any): Promise<import("./schemas/case.schema").Case>;
    findAll(req: any): Promise<import("./schemas/case.schema").Case[]>;
    findOne(id: string): Promise<import("./schemas/case.schema").CaseDocument | null>;
}
