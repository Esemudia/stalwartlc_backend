import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InvoicesModule } from './invoices/invoices.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ClientsModule } from './clients/clients.module';
import { MattersModule } from './matters/matters.module';
import { DocumentsModule } from './documents/documents.module';
import { DocumentVersionsModule } from './document-versions/document-versions.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { TasksModule } from './tasks/tasks.module';
import { EventsModule } from './events/events.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuditModule } from './audit/audit.module';
import { VerificationModule } from './verification/verification.module';
import { CommunicationsModule } from './communications/communications.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb+srv://eseokpako_db_user:CfL95q5exRRwRf3s@cluster0.sdkep3x.mongodb.net/?appName=Cluster0'
    ),
    ScheduleModule.forRoot(),
    AuthModule,
    InvoicesModule,
    UsersModule,
    RolesModule,
    ClientsModule,
    MattersModule,
    DocumentsModule,
    DocumentVersionsModule,
    ApprovalsModule,
    TasksModule,
    EventsModule,
    NotificationsModule,
    AuditModule,
    VerificationModule,
    CommunicationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
