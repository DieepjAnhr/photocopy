import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmExModule } from 'src/common/modules/custom-typeorm.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule { }
