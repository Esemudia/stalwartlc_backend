import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppDocument, AppDocumentSchema } from './schemas/document.schema';
import { DocumentsController } from './documents.controller';
import { Matter, MatterSchema } from '../matters/schemas/matter.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppDocument.name, schema: AppDocumentSchema },
      { name: Matter.name, schema: MatterSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [],
  controllers: [DocumentsController],
  exports: [MongooseModule],
})
export class DocumentsModule { }