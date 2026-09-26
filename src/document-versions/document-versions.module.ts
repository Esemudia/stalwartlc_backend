import { DocumentVersionsController } from './document-versions.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentVersion, DocumentVersionSchema } from './schemas/documentversion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DocumentVersion.name, schema: DocumentVersionSchema }])
  ],
  providers: [],
  controllers: [DocumentVersionsController],
  exports: [MongooseModule],
})
export class DocumentVersionsModule {}