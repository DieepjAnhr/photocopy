import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.dto';
import { UpdatePermissionInput } from './dto/update-permission.dto';
import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: BaseRepository<Permission>,
  ) {}

  async findAll() {
    return this.permissionRepository.find();
  }

  async findOne(id: number) {
    return this.permissionRepository.findOneBy({ id });
  }

  async create(data: CreatePermissionInput) {
    return this.permissionRepository.save(data);
  }

  async update(id: number, data: UpdatePermissionInput) {
    await this.permissionRepository.update(id, data);
    return this.permissionRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.permissionRepository.findOneBy({ id });
    await this.permissionRepository.delete(id);
    return user;
  }

  async getRolesByPermission(permissionId: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id: permissionId },
      relations: ['roles'],
    });

    if (!permission)
      throw new Error(`Permission with ID ${permissionId} not found`);

    return permission.roles;
  }
}
