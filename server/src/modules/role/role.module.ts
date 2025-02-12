import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { RoleRepository } from './role.repository';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), LoggerModule],
  providers: [RoleResolver, RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
