import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { User } from './entity/user.entity';

@Injectable()
export class UserService extends AbstractService<User, UserRepository> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
