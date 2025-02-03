import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { Role } from './entities/role.entity';
import { PermissionRepository } from '../permission/permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleResolver, RoleService, RoleRepository, PermissionRepository],
  exports: [RoleService],
})
export class RoleModule {}
