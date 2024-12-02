import { forwardRef, Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { Permission } from '../permission/entity/permission.entity';
import { PermissionService } from '../permission/permission.service';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), forwardRef(() => PermissionModule)],
  providers: [RoleResolver, RoleService, PermissionService],
  exports: [TypeOrmModule],
})
export class RoleModule { }
