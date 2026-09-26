import { RolesController } from './roles.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])
  ],
  providers: [],
  controllers: [RolesController],
  exports: [MongooseModule],
})
export class RolesModule {}