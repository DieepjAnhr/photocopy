import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { User } from '../user/entities/user.entity';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleRepository } from './role.repository';
import {
  GetManyInput,
  GetOneInput,
} from 'src/common/graphql/inputs/query.input';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getOne(args: GetOneInput<Role>): Promise<Role> {
    const role = await this.roleRepository.getOne(args?.where);
    return role;
  }

  async getMany(args: GetManyInput<Role>): Promise<Role[]> {
    return await this.roleRepository.getMany(args?.where);
  }

  async create(data: CreateRoleInput, performBy?: User): Promise<Role> {
    const role = this.roleRepository.create({
      ...data,
      created_by: performBy?.id,
      updated_by: performBy?.id,
    });
    return await this.roleRepository.save(role);
  }

  async update(
    id: number,
    data: UpdateRoleInput,
    performBy?: User,
  ): Promise<Role> {
    const role = await this.roleRepository.preload({
      id,
      ...data,
      updated_by: performBy?.id,
    });
    if (!role) throw new NotFoundException('Role not found!');
    return await this.roleRepository.save(role);
  }

  async remove(id: number, performBy?: User): Promise<boolean> {
    await this.roleRepository.update({ id }, { deleted_by: performBy?.id });
    await this.roleRepository.softDelete({ id });
    return true;
  }
}
