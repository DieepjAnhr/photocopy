import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';

@Module({
  providers: [UserResolver, UserService, RoleService],
})
export class UserModule {}
