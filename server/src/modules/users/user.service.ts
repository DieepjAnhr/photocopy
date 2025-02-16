import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { User } from './entities/user.entity';
import { AppLogger } from 'src/common/logger/logger.service';
import { DeepPartial } from 'typeorm';
import { RoleService } from '../roles/role.service';

@Injectable()
export class UserService extends AbstractService<User, UserRepository> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    appLogger: AppLogger,
  ) {
    super(userRepository, appLogger);
  }

  async create(data: DeepPartial<User>, createdBy?: User): Promise<User> {
    const createdById = createdBy?.id;
    this.logger.debug(
      `Create record by ${createdById} with arg: ${JSON.stringify(data)}`,
    );
    const [roles] = await Promise.all([
      this.roleService.getByIds(data.role_ids),
    ]);

    const user = await this.userRepository.create({
      ...data,
      created_by: createdById,
      updated_by: createdById,
      roles,
    });
    return user;
  }

  async update(
    id: number,
    data: DeepPartial<User>,
    updatedBy?: User,
  ): Promise<User | null> {
    const updatedById = updatedBy?.id;
    this.logger.debug(
      `Update record by ${updatedById} with arg: ${JSON.stringify(data)}`,
    );
    const user = await this.userRepository.getOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) return null;

    const [roles] = await Promise.all([
      data.role_ids
        ? this.roleService.getByIds(data.role_ids)
        : Promise.resolve(user.roles),
    ]);

    Object.assign(user, data, {
      role_ids: roles.map((elm) => elm.id),
      updated_by: updatedById,
      roles,
    });

    return this.userRepository.save(user);
  }
}
