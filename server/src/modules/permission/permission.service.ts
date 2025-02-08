import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService extends AbstractService<
  Permission,
  PermissionRepository
> {
  constructor(private readonly permissionRepository: PermissionRepository) {
    super(permissionRepository);
  }
}
