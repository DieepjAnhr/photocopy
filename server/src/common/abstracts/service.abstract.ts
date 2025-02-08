import { DeepPartial } from 'typeorm';
import { AbstractRepository } from './repository.abstract';

export abstract class AbstractService<T, R extends AbstractRepository<T>> {
  constructor(protected readonly repository: R) {}

  async getOne(id: number): Promise<T | null> {
    return await this.repository.getOne({ id } as any);
  }

  async getByBatch(ids: number[]): Promise<T[]> {
    return await this.repository.getMany(ids);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return await this.repository.create(data);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T | null> {
    return await this.repository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
