import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { CreateRoleInput } from './dto/create-role.dto';
import { UpdateRoleInput } from './dto/update-role.dto';
import { Permission } from '../permission/entity/permission.entity';
import { AbstractBaseRepository } from 'src/common/base/base.repository';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: RoleRepository,
    @InjectRepository(Permission)
    private readonly permissionRepository: AbstractBaseRepository<Permission>,
  ) {}

  async findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    return this.roleRepository.findOneBy({ id });
  }

  async create(data: CreateRoleInput) {
    const permissions = await this.permissionRepository.find();
    const role = this.roleRepository.create({ ...data, permissions });
    return this.roleRepository.save(role);
  }

  async update(id: number, data: UpdateRoleInput) {
    await this.roleRepository.update(id, data);
    return this.roleRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.roleRepository.findOneBy({ id });
    await this.roleRepository.delete(id);
    return user;
  }

  async getPermissionByRole(roleId: number) {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    if (!role) throw new Error(`Role with ID ${roleId} not found`);

    return role.permissions;
  }
}
