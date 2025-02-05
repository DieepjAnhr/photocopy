import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './user.repository';
import {
  GetManyInput,
  GetOneInput,
} from 'src/common/graphql/inputs/query.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getOne(args: GetOneInput<User>) {
    const user = await this.userRepository.getOne(args);
    return user;
  }

  async getByQuery(args: GetManyInput<User>) {
    return await this.userRepository.getByQuery(args);
  }

  async getMany(args: GetManyInput<User>) {
    return await this.userRepository.getMany(args);
  }

  async create(data: CreateUserInput, performBy?: User) {
    const user = this.userRepository.create({
      ...data,
      created_by: performBy?.id,
      updated_by: performBy?.id,
    });
    return await this.userRepository.save(user);
  }

  async update(id: number, data: UpdateUserInput, performBy?: User) {
    const user = await this.userRepository.preload({
      id,
      ...data,
      updated_by: performBy?.id,
    });
    if (!user) throw new NotFoundException('User not found!');
    return await this.userRepository.save(user);
  }

  async remove(id: number, performBy?: User): Promise<boolean> {
    await this.userRepository.update({ id }, { deleted_by: performBy?.id });
    await this.userRepository.softDelete({ id });
    return true;
  }
}
