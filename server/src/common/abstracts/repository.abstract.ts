import { Repository, DeepPartial, In } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  async getOne(where: Partial<T>): Promise<T | null> {
    return await this.repository.findOne({ where } as any);
  }

  async getMany(ids: number[]): Promise<T[]> {
    return await this.repository.find({ where: { id: In(ids) } as any });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    return await this.getOne({ id } as any);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async test() {
    console.log('test');
  }
}
