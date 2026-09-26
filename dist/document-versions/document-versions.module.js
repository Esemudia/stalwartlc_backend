"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentVersionsModule = void 0;
const document_versions_controller_1 = require("./document-versions.controller");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const documentversion_schema_1 = require("./schemas/documentversion.schema");
let DocumentVersionsModule = class DocumentVersionsModule {
};
exports.DocumentVersionsModule = DocumentVersionsModule;
exports.DocumentVersionsModule = DocumentVersionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: documentversion_schema_1.DocumentVersion.name, schema: documentversion_schema_1.DocumentVersionSchema }])
        ],
        providers: [],
        controllers: [document_versions_controller_1.DocumentVersionsController],
        exports: [mongoose_1.MongooseModule],
    })
], DocumentVersionsModule);
//# sourceMappingURL=document-versions.module.js.map