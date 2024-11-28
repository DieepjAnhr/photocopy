import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [RoleResolver, RoleService, UserService],
})
export class RoleModule {}
