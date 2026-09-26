import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schemas/client.schema';
import { ClientsController } from './clients.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])
  ],
  providers: [],
  controllers: [ClientsController],
  exports: [MongooseModule],
})
export class ClientsModule { }