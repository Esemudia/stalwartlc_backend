import { CommunicationsController } from './communications.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Matter, MatterSchema } from '../matters/schemas/matter.schema';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
      { name: Matter.name, schema: MatterSchema }
    ])
  ],
  providers: [ChatGateway],
  controllers: [CommunicationsController],
  exports: [MongooseModule, ChatGateway],
})
export class CommunicationsModule {}