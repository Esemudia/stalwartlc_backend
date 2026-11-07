"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const invoices_module_1 = require("./invoices/invoices.module");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const clients_module_1 = require("./clients/clients.module");
const matters_module_1 = require("./matters/matters.module");
const documents_module_1 = require("./documents/documents.module");
const document_versions_module_1 = require("./document-versions/document-versions.module");
const approvals_module_1 = require("./approvals/approvals.module");
const tasks_module_1 = require("./tasks/tasks.module");
const events_module_1 = require("./events/events.module");
const notifications_module_1 = require("./notifications/notifications.module");
const audit_module_1 = require("./audit/audit.module");
const verification_module_1 = require("./verification/verification.module");
const communications_module_1 = require("./communications/communications.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_UR || ""),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            invoices_module_1.InvoicesModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            clients_module_1.ClientsModule,
            matters_module_1.MattersModule,
            documents_module_1.DocumentsModule,
            document_versions_module_1.DocumentVersionsModule,
            approvals_module_1.ApprovalsModule,
            tasks_module_1.TasksModule,
            events_module_1.EventsModule,
            notifications_module_1.NotificationsModule,
            audit_module_1.AuditModule,
            verification_module_1.VerificationModule,
            communications_module_1.CommunicationsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map