const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const modules = {
  'users': { name: 'UsersModule', modelName: 'User', schemaName: 'UserSchema', file: 'user.schema' },
  'roles': { name: 'RolesModule', modelName: 'Role', schemaName: 'RoleSchema', file: 'role.schema' },
  'clients': { name: 'ClientsModule', modelName: 'Client', schemaName: 'ClientSchema', file: 'client.schema' },
  'matters': { name: 'MattersModule', modelName: 'Matter', schemaName: 'MatterSchema', file: 'matter.schema' },
  'documents': { name: 'DocumentsModule', modelName: 'AppDocument', schemaName: 'AppDocumentSchema', file: 'document.schema' },
  'document-versions': { name: 'DocumentVersionsModule', modelName: 'DocumentVersion', schemaName: 'DocumentVersionSchema', file: 'documentversion.schema' },
  'approvals': { name: 'ApprovalsModule', modelName: 'Approval', schemaName: 'ApprovalSchema', file: 'approval.schema' },
  'tasks': { name: 'TasksModule', modelName: 'Task', schemaName: 'TaskSchema', file: 'task.schema' },
  'events': { name: 'EventsModule', modelName: 'Event', schemaName: 'EventSchema', file: 'event.schema' },
  'notifications': { name: 'NotificationsModule', modelName: 'Notification', schemaName: 'NotificationSchema', file: 'notification.schema' },
  'audit': { name: 'AuditModule', modelName: 'AuditLog', schemaName: 'AuditLogSchema', file: 'auditlog.schema' },
  'verification': { name: 'VerificationModule', modelName: 'VerificationRecord', schemaName: 'VerificationRecordSchema', file: 'verificationrecord.schema' },
  'communications': { name: 'CommunicationsModule', modelName: 'Message', schemaName: 'MessageSchema', file: 'message.schema' }
};

let appModuleImports = '';
let appModuleArray = [];

for (const [mod, data] of Object.entries(modules)) {
  const modDir = path.join(srcDir, mod);
  if (!fs.existsSync(modDir)) fs.mkdirSync(modDir, { recursive: true });
  
  const modFile = path.join(modDir, `${mod}.module.ts`);
  
  const content = `import { Module } from '@nestjs/common';\nimport { MongooseModule } from '@nestjs/mongoose';\nimport { ${data.modelName}, ${data.schemaName} } from './schemas/${data.file}';\n\n@Module({\n  imports: [\n    MongooseModule.forFeature([{ name: ${data.modelName}.name, schema: ${data.schemaName} }])\n  ],\n  providers: [],\n  controllers: [],\n  exports: [MongooseModule],\n})\nexport class ${data.name} {}`;
  
  fs.writeFileSync(modFile, content);
  
  const className = data.name;
  appModuleImports += `import { ${className} } from './${mod}/${mod}.module';\n`;
  appModuleArray.push(className);
}

// Ensure the old modules might be needed or overridden, let's just create a completely fresh AppModule

let appModuleContent = `import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InvoicesModule } from './invoices/invoices.module';
${appModuleImports}

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/stalwartlc'
    ),
    AuthModule,
    InvoicesModule,
    ${appModuleArray.join(',\n    ')}
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
`;
fs.writeFileSync(path.join(srcDir, 'app.module.ts'), appModuleContent);
console.log("SUCCESS");
