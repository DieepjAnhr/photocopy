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

  async getOne(args: GetOneInput<Permission>): Promise<Permission> {
    const role = await this.permissionRepository.getOne(args.where);
    return role;
  }

  async getMany(args: GetManyInput<Permission>): Promise<Permission[]> {
    return await this.permissionRepository.getMany(args.where);
  }

  async create(data: CreatePermissionInput): Promise<Permission> {
    const role = this.permissionRepository.create({ ...data });
    return await this.permissionRepository.save(role);
  }

  async update(id: number, data: UpdatePermissionInput): Promise<Permission> {
    const permission = await this.permissionRepository.preload({ id, ...data });
    if (!permission) throw new NotFoundException('Permission not found!');
    return await this.permissionRepository.save(permission);
  }

  async remove(id: number): Promise<boolean> {
    await this.permissionRepository.softDelete({ id });
    return true;
  }
}
