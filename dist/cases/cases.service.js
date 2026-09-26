"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const case_schema_1 = require("./schemas/case.schema");
let CasesService = class CasesService {
    caseModel;
    constructor(caseModel) {
        this.caseModel = caseModel;
    }
    async create(createDto) {
        const createdCase = new this.caseModel(createDto);
        return createdCase.save();
    }
    async findAll() {
        return this.caseModel.find().exec();
    }
    async findByClientId(clientId) {
        return this.caseModel.find({ clientId: clientId }).exec();
    }
    async findById(id) {
        return this.caseModel.findById(id).exec();
    }
};
exports.CasesService = CasesService;
exports.CasesService = CasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(case_schema_1.Case.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CasesService);
//# sourceMappingURL=cases.service.js.map