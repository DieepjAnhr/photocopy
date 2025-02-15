import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleRepository } from './role.repository';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Permission } from '../permissions/entities/permission.entity';
import { PermissionRepository } from '../permissions/permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), LoggerModule],
  providers: [RoleResolver, RoleService, RoleRepository, PermissionRepository],
  exports: [RoleService],
})
export class RoleModule {}
