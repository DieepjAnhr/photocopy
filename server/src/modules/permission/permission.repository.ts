import { AbstractRepository } from 'src/common/abstracts/repository.abstract';
import { Permission } from './entities/permission.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PermissionRepository extends AbstractRepository<Permission> {
  constructor(private readonly dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }
}
