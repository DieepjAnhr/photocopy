import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './user.repository';
import {
  GetManyInput,
  GetOneInput,
} from 'src/common/graphql/inputs/query.input';
import { RoleRepository } from '../role/role.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async getOne(args: GetOneInput<User>): Promise<User> {
    const user = await this.userRepository.getOne(args?.where);
    return user;
  }

  async getMany(args: GetManyInput<User>) {
    return await this.userRepository.getMany(args?.where);
  }

  async create(data: CreateUserInput, performBy?: User): Promise<User> {
    const roleIds = data?.role_ids
      ? data.role_ids.split(',').map((elm) => Number(elm.trim()))
      : [];

    const roles = await this.roleRepository.getMany({ id: { $in: roleIds } });

    const user = this.userRepository.create({
      ...data,
      created_by: performBy?.id,
      updated_by: performBy?.id,
      roles,
    });
    return await this.userRepository.save(user);
  }

  async update(
    id: number,
    data: UpdateUserInput,
    performBy?: User,
  ): Promise<User> {
    const roleIds = data?.role_ids
      ? data.role_ids.split(',').map((elm) => Number(elm.trim()))
      : [];

    const roles = await this.roleRepository.getMany({ id: { $in: roleIds } });

    const user = await this.userRepository.preload({
      id,
      ...data,
      updated_by: performBy?.id,
      roles,
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
