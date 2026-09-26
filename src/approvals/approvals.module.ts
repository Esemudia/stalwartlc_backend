import { ApprovalsController } from './approvals.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Approval, ApprovalSchema } from './schemas/approval.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Approval.name, schema: ApprovalSchema }])
  ],
  providers: [],
  controllers: [ApprovalsController],
  exports: [MongooseModule],
})
export class ApprovalsModule {}