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
exports.CaseSchema = exports.Case = exports.CaseUpdate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../../users/schemas/user.schema");
class CaseUpdate {
    date;
    title;
    description;
    author;
}
exports.CaseUpdate = CaseUpdate;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CaseUpdate.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CaseUpdate.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CaseUpdate.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CaseUpdate.prototype, "author", void 0);
let Case = class Case {
    caseNumber;
    title;
    type;
    status;
    attorney;
    uploadedBy;
    filedDate;
    nextHearing;
    description;
    clientName;
    clientId;
    court;
    claimValue;
    opposingParty;
    updates;
};
exports.Case = Case;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Case.prototype, "caseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Case.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Case.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['active', 'pending', 'on_hold', 'closed'] }),
    (0, mongoose_1.Prop)({ required: true, default: 'pending', enum: ['active', 'pending', 'on_hold', 'closed'] }),
    __metadata("design:type", String)
], Case.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Case.prototype, "attorney", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Case.prototype, "uploadedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Case.prototype, "filedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Case.prototype, "nextHearing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Case.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Case.prototype, "clientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Case.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Case.prototype, "court", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Case.prototype, "claimValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Case.prototype, "opposingParty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CaseUpdate] }),
    (0, mongoose_1.Prop)({ type: [Object], default: [] }),
    __metadata("design:type", Array)
], Case.prototype, "updates", void 0);
exports.Case = Case = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Case);
exports.CaseSchema = mongoose_1.SchemaFactory.createForClass(Case);
//# sourceMappingURL=case.schema.js.map