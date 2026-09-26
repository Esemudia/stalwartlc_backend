"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationModule = void 0;
const verification_controller_1 = require("./verification.controller");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const verificationrecord_schema_1 = require("./schemas/verificationrecord.schema");
const matter_schema_1 = require("../matters/schemas/matter.schema");
const document_schema_1 = require("../documents/schemas/document.schema");
const client_schema_1 = require("../clients/schemas/client.schema");
let VerificationModule = class VerificationModule {
};
exports.VerificationModule = VerificationModule;
exports.VerificationModule = VerificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: verificationrecord_schema_1.VerificationRecord.name, schema: verificationrecord_schema_1.VerificationRecordSchema },
                { name: matter_schema_1.Matter.name, schema: matter_schema_1.MatterSchema },
                { name: document_schema_1.AppDocument.name, schema: document_schema_1.AppDocumentSchema },
                { name: client_schema_1.Client.name, schema: client_schema_1.ClientSchema },
            ])
        ],
        providers: [],
        controllers: [verification_controller_1.VerificationController],
        exports: [mongoose_1.MongooseModule],
    })
], VerificationModule);
//# sourceMappingURL=verification.module.js.map