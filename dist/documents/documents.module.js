"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const document_schema_1 = require("./schemas/document.schema");
const documents_controller_1 = require("./documents.controller");
const matter_schema_1 = require("../matters/schemas/matter.schema");
const user_schema_1 = require("../users/schemas/user.schema");
let DocumentsModule = class DocumentsModule {
};
exports.DocumentsModule = DocumentsModule;
exports.DocumentsModule = DocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: document_schema_1.AppDocument.name, schema: document_schema_1.AppDocumentSchema },
                { name: matter_schema_1.Matter.name, schema: matter_schema_1.MatterSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema }
            ])
        ],
        providers: [],
        controllers: [documents_controller_1.DocumentsController],
        exports: [mongoose_1.MongooseModule],
    })
], DocumentsModule);
//# sourceMappingURL=documents.module.js.map