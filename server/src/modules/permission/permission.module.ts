import { Module } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionRepository } from './permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionResolver, PermissionService, PermissionRepository],
  exports: [PermissionService],
})
export class PermissionModule {}
