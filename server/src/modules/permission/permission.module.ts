import { forwardRef, Module } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { RoleService } from '../role/role.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), forwardRef(() => RoleModule)],
  providers: [PermissionResolver, PermissionService, RoleService],
  exports: [TypeOrmModule],
})
export class PermissionModule { }
