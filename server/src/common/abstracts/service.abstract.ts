import { DeepPartial } from 'typeorm';
import { AbstractRepository } from './repository.abstract';
import { GetManyInput, GetOneInput } from '../graphql/query.input';

export abstract class AbstractService<T, R extends AbstractRepository<T>> {
  constructor(protected readonly repository: R) {}

  async getOne(args?: GetOneInput<T>): Promise<T | null> {
    return await this.repository.getOne(args as any);
  }

  async getMany(args?: GetManyInput<T>): Promise<IPaginationResponse<T>> {
    return await this.repository.getPagination(args as any);
  }

  async getDataloader(ids: number[]): Promise<T[]> {
    return await this.repository.getByIds(ids);
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
