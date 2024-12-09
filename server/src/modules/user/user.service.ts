import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserArgs } from './dto/user.args';
import { UpdateUserInput } from './dto/update-user.input';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/entity/role.entity';

@Injectable()
export class UserService {
  constructor(
    /* 
      Use @InjectRepository<Entity> here because Repository module does not import at UserModule
    */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async getOne(args: UserArgs): Promise<User> {
    const where = args?.filter ? { where: args.filter } : {};
    const user = await this.userRepository.findOne(where);
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  async getMany(args: UserArgs): Promise<User[]> {
    const where = args?.filter ? { where: args.filter } : {};
    return await this.userRepository.find(where);
  }

  async create(data: CreateUserInput, perfomer?: User): Promise<User> {
    const roles = await this.roleRepository.find({
      where: { id: In(data.role_ids) },
    });

    if (roles.length !== data.role_ids.length) {
      throw new Error('Some roles were not found');
    }

    const user = this.userRepository.create({
      ...data,
      creator_id: perfomer?.id,
      updater_id: perfomer?.id,
      roles,
    });
    return await this.userRepository.save(user);
  }

  async update(
    id: number,
    data: UpdateUserInput,
    perfomer?: User,
  ): Promise<User> {
    await this.userRepository.update(
      { id },
      { ...data, updater_id: perfomer?.id },
    );
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async remove(id: number, perfomer?: User): Promise<boolean> {
    const user = await this.userRepository.update(
      { id },
      { deleter_id: perfomer?.id },
    );
    await this.userRepository.softDelete({ id });
    return true;
  }
}
