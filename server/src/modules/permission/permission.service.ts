import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { Repository } from 'typeorm';
import { PermissionArgs } from './dto/permission.args';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Injectable()
export class PermissionService {
  constructor(
    /* 
      Use @InjectRepository<Entity> here because Repository module does not import at permissionModule
    */
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async getOne(args: PermissionArgs): Promise<Permission> {
    const where = args?.filter ? { where: args.filter } : {};
    const permission = await this.permissionRepository.findOne(where);
    if (!permission) throw new NotFoundException('Permission not found!');
    return permission;
  }

  async getMany(args: PermissionArgs): Promise<Permission[]> {
    const where = args?.filter ? { where: args.filter } : {};
    return await this.permissionRepository.find(where);
  }

  async create(data: CreatePermissionInput): Promise<Permission> {
    const permission = this.permissionRepository.create({
      ...data,
    });
    return await this.permissionRepository.save(permission);
  }

  async update(id: number, data: UpdatePermissionInput): Promise<Permission> {
    await this.permissionRepository.update({ id }, { ...data });
    const permission = await this.permissionRepository.findOneBy({ id });
    return permission;
  }

  async remove(id: number): Promise<boolean> {
    await this.permissionRepository.softDelete({ id });
    return true;
  }
}
