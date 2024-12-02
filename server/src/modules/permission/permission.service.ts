import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionInput } from './dto/create-permission.dto';
import { UpdatePermissionInput } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
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
}
