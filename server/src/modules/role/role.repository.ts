import { AbstractRepository } from 'src/common/abstracts/repository.abstract';
import { Role } from './entities/role.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  constructor(private readonly dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }
}
