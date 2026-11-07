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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDocumentSchema = exports.AppDocument = exports.DOCUMENT_CATEGORIES = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
exports.DOCUMENT_CATEGORIES = ['Court Processes', 'Exhibits'];
let AppDocument = class AppDocument extends mongoose_2.Document {
    documentNumber;
    name;
    originalFileName;
    clientId;
    matterId;
    category;
    description;
    currentVersion;
    status;
    confidentiality;
    tags;
    uploadedBy;
    fileUrl;
    filePath;
};
exports.AppDocument = AppDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], AppDocument.prototype, "documentNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AppDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AppDocument.prototype, "originalFileName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Client' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AppDocument.prototype, "clientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Matter' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AppDocument.prototype, "matterId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Court Processes', enum: ['Court Processes', 'Exhibits', 'court_processes', 'exhibits', 'court_process', 'exhibit', 'pleading', 'evidence', 'brief', 'contract', 'correspondence', 'other'] }),
    __metadata("design:type", String)
], AppDocument.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AppDocument.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], AppDocument.prototype, "currentVersion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'draft' }),
    __metadata("design:type", String)
], AppDocument.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'standard' }),
    __metadata("design:type", String)
], AppDocument.prototype, "confidentiality", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], AppDocument.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AppDocument.prototype, "uploadedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AppDocument.prototype, "fileUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AppDocument.prototype, "filePath", void 0);
exports.AppDocument = AppDocument = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'documents' })
], AppDocument);
exports.AppDocumentSchema = mongoose_1.SchemaFactory.createForClass(AppDocument);
//# sourceMappingURL=document.schema.js.map