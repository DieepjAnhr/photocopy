import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Role } from '../roles/entities/role.entity';
import { RoleRepository } from '../roles/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), LoggerModule],
  providers: [UserResolver, UserService, UserRepository, RoleRepository],
  exports: [UserService],
})
export class UserModule {}
