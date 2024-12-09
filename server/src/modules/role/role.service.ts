import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { In, Repository } from 'typeorm';
import { RoleArgs } from './dto/role.args';
import { CreateRoleInput } from './dto/create-role.input';
import { User } from '../user/entities/user.entity';
import { UpdateUserInput } from '../user/dto/update-user.input';
import { Permission } from '../permission/entity/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    /* 
          Use @InjectRepository<Entity> here because Repository module does not import at UserModule
        */
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) { }

  async getOne(args: RoleArgs): Promise<Role> {
    const where = args?.filter ? { where: args.filter } : {};
    const role = await this.roleRepository.findOne(where);
    if (!role) throw new NotFoundException('Role not found!');
    return role;
  }

  async getMany(args: RoleArgs): Promise<Role[]> {
    const where = args?.filter ? { where: args.filter } : {};
    return await this.roleRepository.find(where);
  }

  async create(data: CreateRoleInput, perfomer?: User): Promise<Role> {
    const permissions = await this.permissionRepository.find({
      where: { id: In(data.permission_ids) },
    });

    if (permissions.length !== data.permission_ids.length) {
      throw new Error('Some permissions were not found');
    }

    const role = this.roleRepository.create({
      ...data,
      creator_id: perfomer?.id,
      updater_id: perfomer?.id,
      permissions,
    });
    return await this.roleRepository.save(role);
  }

  async update(
    id: number,
    data: UpdateUserInput,
    perfomer?: User,
  ): Promise<Role> {
    await this.roleRepository.update(
      { id },
      { ...data, updater_id: perfomer?.id },
    );
    const role = await this.roleRepository.findOneBy({ id });
    return role;
  }

  async remove(id: number, perfomer?: User): Promise<boolean> {
    const role = await this.roleRepository.update(
      { id },
      { deleter_id: perfomer?.id },
    );
    await this.roleRepository.softDelete({ id });
    return true;
  }
}
