import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { Permission } from './entities/permission.entity';
import { AppLogger } from 'src/common/logger/logger.service';

@Injectable()
export class PermissionService extends AbstractService<
  Permission,
  PermissionRepository
> {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    appLogger: AppLogger,
  ) {
    super(permissionRepository, appLogger);
  }
}
