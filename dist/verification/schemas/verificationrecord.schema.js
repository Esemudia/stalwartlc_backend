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
exports.VerificationRecordSchema = exports.VerificationRecord = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let VerificationRecord = class VerificationRecord extends mongoose_2.Document {
    verificationCode;
    documentId;
    documentTitle;
    documentName;
    documentType;
    matterId;
    matterTitle;
    clientId;
    clientName;
    hash;
    status;
    issuedBy;
    signatoryName;
    signatoryRole;
    jurisdiction;
    issuedAt;
    expiresAt;
    revokedAt;
    revocationReason;
    notes;
};
exports.VerificationRecord = VerificationRecord;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], VerificationRecord.prototype, "verificationCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'AppDocument' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], VerificationRecord.prototype, "documentId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "documentTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "documentName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "documentType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Matter' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], VerificationRecord.prototype, "matterId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "matterTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Client' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], VerificationRecord.prototype, "clientId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "clientName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "hash", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'valid' }),
    __metadata("design:type", String)
], VerificationRecord.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], VerificationRecord.prototype, "issuedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "signatoryName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "signatoryRole", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "jurisdiction", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], VerificationRecord.prototype, "issuedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], VerificationRecord.prototype, "expiresAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], VerificationRecord.prototype, "revokedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "revocationReason", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRecord.prototype, "notes", void 0);
exports.VerificationRecord = VerificationRecord = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], VerificationRecord);
exports.VerificationRecordSchema = mongoose_1.SchemaFactory.createForClass(VerificationRecord);
//# sourceMappingURL=verificationrecord.schema.js.map