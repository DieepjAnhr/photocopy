import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async getMany(query: string) {
    const result = await this.userRepository.find();

    return result;
  }

  async getOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async create(createData: string) {
    return this.userRepository.save({});
  }

  async update(id: number, updateData: string) {
    // await this.userRepository.update(id, updateData);

    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    await this.userRepository.delete(id);
    return user;
  }
}
