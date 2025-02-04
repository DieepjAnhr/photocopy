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
import { PermissionRepository } from '../permission/permission.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async getOne(args: GetOneInput<Role>) {
    const role = await this.roleRepository.getOne(args);
    return role;
  }

  async getByQuery(args: GetManyInput<Role>) {
    return await this.roleRepository.getByQuery(args);
  }

  async getMany(args: GetManyInput<Role>) {
    return await this.roleRepository.getMany(args);
  }

  async create(data: CreateRoleInput, performBy?: User) {
    const role = this.roleRepository.create({
      ...data,
      created_by: performBy?.id,
      updated_by: performBy?.id,
    });
    return await this.roleRepository.save(role);
  }

  async update(id: number, data: UpdateRoleInput, performBy?: User) {
    const role = await this.roleRepository.preload({
      id,
      ...data,
      updated_by: performBy?.id,
    });
    if (!role) throw new NotFoundException('Role not found!');
    return await this.roleRepository.save(role);
  }

  async remove(id: number, performBy?: User) {
    await this.roleRepository.update({ id }, { deleted_by: performBy?.id });
    await this.roleRepository.softDelete({ id });
    return true;
  }
}
