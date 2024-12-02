import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.dto';
import { UpdateRoleInput } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    return this.roleRepository.findOneBy({ id });
  }

  async create(data: CreateRoleInput) {
    return this.roleRepository.save(data);
  }

  async update(id: number, data: UpdateRoleInput) {
    await this.roleRepository.update(id, data);
    return this.roleRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.roleRepository.findOneBy({ id });
    await this.roleRepository.delete(id);
    return user;
  }
}
