import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { User } from './entity/user.entity';
import { AppLogger } from 'src/common/logger/logger.service';

@Injectable()
export class UserService extends AbstractService<User, UserRepository> {
  constructor(
    private readonly userRepository: UserRepository,
    appLogger: AppLogger,
  ) {
    super(userRepository, appLogger);
  }
}
