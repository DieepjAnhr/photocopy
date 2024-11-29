import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async create(createUserInput: CreateUserInput) {
    return this.userRepository.save(createUserInput);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    await this.userRepository.update(id, updateUserInput);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    await this.userRepository.delete(id);
    return user;
  }

  // listByRoleId(role_id: number): User[] {
  //   return this.users.filter(
  //     ({ role_id: item_role_id }) => (item_role_id = role_id),
  //   );
  // }
}
