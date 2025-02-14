import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { Role } from './entity/role.entity';
import { AppLogger } from 'src/common/logger/logger.service';
import { PermissionRepository } from '../permission/permission.repository';
import { User } from '../user/entity/user.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class RoleService extends AbstractService<Role, RoleRepository> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
    appLogger: AppLogger,
  ) {
    super(roleRepository, appLogger);
  }

  async create(data: DeepPartial<Role>, createdBy?: User): Promise<Role> {
    const createdById = createdBy?.id;
    this.logger.debug(
      `Create record by ${createdById} with arg: ${JSON.stringify(data)}`,
    );
    const permissions = await this.permissionRepository.getByIds(
      data.permission_ids,
    );
    const role = await this.roleRepository.create({
      ...data,
      created_by: createdById,
      updated_by: createdById,
      permissions,
    });
    return role;
  }

  async update(
    id: number,
    data: DeepPartial<Role>,
    updatedBy?: User,
  ): Promise<Role | null> {
    const updatedById = updatedBy?.id;
    this.logger.debug(
      `Update record by ${updatedById} with arg: ${JSON.stringify(data)}`,
    );
    const role = await this.roleRepository.getOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!role) return null;

    if (data.permission_ids) {
      role.permissions = await this.permissionRepository.getByIds(
        data.permission_ids,
      );
    }

    Object.assign(role, data, { updated_by: updatedById });

    return this.roleRepository.save(role);
  }
}
