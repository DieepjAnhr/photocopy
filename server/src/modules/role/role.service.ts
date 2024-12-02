import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { In, Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.dto';
import { UpdateRoleInput } from './dto/update-role.dto';
import { Permission } from '../permission/entity/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) { }

  async findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    return this.roleRepository.findOneBy({ id });
  }

  async create(data: CreateRoleInput) {
    const permissions = await this.permissionRepository.find();
    const role = this.roleRepository.create({ ...data, permissions })
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

  async getRoleByPermissionId(permissionId: number) {
    return this.roleRepository
      .createQueryBuilder('role')
      .innerJoin('role.permissions', 'permission', 'permission.id = :permissionId', { permissionId })
      .getMany()
  }
}
