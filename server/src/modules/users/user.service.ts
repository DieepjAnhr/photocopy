import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserArgs } from './dto/user.args';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    /* 
      Use @InjectRepository<Entity> here because Repository module does not import at UserModule
    */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async getOne(id: number): Promise<User> {
    return {} as any;
  }

  async getMany(args: UserArgs): Promise<User[]> {
    return [] as User[];
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = await this.userRepository.save(data);
    return user;
  }

  async update(id: number, data: UpdateUserInput): Promise<User> {
    return {} as any;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
