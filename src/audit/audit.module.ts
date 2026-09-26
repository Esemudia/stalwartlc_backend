import { AuditController } from './audit.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLog, AuditLogSchema } from './schemas/auditlog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuditLog.name, schema: AuditLogSchema }])
  ],
  providers: [],
  controllers: [AuditController],
  exports: [MongooseModule],
})
export class AuditModule {}