import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Role } from '../roles/entities/role.entity';
import { RoleModule } from '../roles/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    LoggerModule,
    forwardRef(() => RoleModule),
  ],
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
