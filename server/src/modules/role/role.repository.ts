import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { AbstractRepository } from 'src/common/abstracts/repository.abstract';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }

  async create(data: CreateRoleInput) {
    const role = this.roleRepository.create(Object.assign(new Role(), data));
    return await this.roleRepository.save(role);
  }

  async getOne() {
    return await this.roleRepository.findOne({ where: { id: 1 } });
  }

  async getMany(roleIds: number[]) {
    return await this.roleRepository.find({ where: { id: In(roleIds) } });
  }
}
