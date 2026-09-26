import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Matter, MatterSchema } from './schemas/matter.schema';
import { MattersController } from './matters.controller';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Matter.name, schema: MatterSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [],
  controllers: [MattersController],
  exports: [MongooseModule],
})
export class MattersModule { }