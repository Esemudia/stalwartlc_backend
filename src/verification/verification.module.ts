import { VerificationController } from './verification.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationRecord, VerificationRecordSchema } from './schemas/verificationrecord.schema';
import { Matter, MatterSchema } from '../matters/schemas/matter.schema';
import { AppDocument, AppDocumentSchema } from '../documents/schemas/document.schema';
import { Client, ClientSchema } from '../clients/schemas/client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VerificationRecord.name, schema: VerificationRecordSchema },
      { name: Matter.name, schema: MatterSchema },
      { name: AppDocument.name, schema: AppDocumentSchema },
      { name: Client.name, schema: ClientSchema },
    ])
  ],
  providers: [],
  controllers: [VerificationController],
  exports: [MongooseModule],
})
export class VerificationModule {}