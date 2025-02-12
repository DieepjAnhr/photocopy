import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { Role } from './entity/role.entity';
import { AppLogger } from 'src/common/logger/logger.service';

@Injectable()
export class RoleService extends AbstractService<Role, RoleRepository> {
  constructor(
    private readonly roleRepository: RoleRepository,
    appLogger: AppLogger,
  ) {
    super(roleRepository, appLogger);
  }
}
