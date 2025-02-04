import { Injectable, NotFoundException } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto//create-permission.input';
import { PermissionRepository } from './permission.repository';
import {
  GetManyInput,
  GetOneInput,
} from 'src/common/graphql/inputs/query.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async getOne(args: GetOneInput<Permission>) {
    const role = await this.permissionRepository.getOne(args);
    return role;
  }

  async getByQuery(args: GetManyInput<Permission>) {
    return await this.permissionRepository.getByQuery(args);
  }

  async create(data: CreatePermissionInput) {
    const role = this.permissionRepository.create({ ...data });
    return await this.permissionRepository.save(role);
  }

  async update(id: number, data: UpdatePermissionInput) {
    const permission = await this.permissionRepository.preload({ id, ...data });
    if (!permission) throw new NotFoundException('Permission not found!');
    return await this.permissionRepository.save(permission);
  }

  async remove(id: number) {
    await this.permissionRepository.softDelete({ id });
    return true;
  }
}
