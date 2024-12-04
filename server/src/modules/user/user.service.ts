import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './inputs/create-user.dto';
import { UpdateUserInput } from './inputs/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getMany() {
    const result = await this.userRepository.find();

    return result;
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
}
