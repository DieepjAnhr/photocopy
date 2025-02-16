import { DeepPartial } from 'typeorm';
import { AbstractRepository } from './repository.abstract';
import { User } from 'src/modules/users/entities/user.entity';
import { AppLogger } from '../logger/logger.service';
import {
  IRepoQueryMany,
  IRepoQueryOne,
} from '../shared/interfaces/repository.input';
import { MetadataResponse } from '../graphql/metadata.response';

export abstract class AbstractService<T, R extends AbstractRepository<T>> {
  private readonly CLASS_NAME = this.constructor.name;
  private readonly _logger: AppLogger;

  constructor(
    protected readonly repository: R,
    appLogger: AppLogger,
  ) {
    this._logger = appLogger;
  }

  async getOne(args?: IRepoQueryOne<T>): Promise<T | null> {
    this.logger.debug(`Fetching one record with arg: ${JSON.stringify(args)}`);
    const result = await this.repository.getOne(args as any);

    return result;
  }

  async getMany(args?: IRepoQueryMany<T>): Promise<IPaginationResponse<T>> {
    this.logger.debug(`Fetching many record with arg: ${JSON.stringify(args)}`);
    const { page, limit } = args?.pagination || {};

    const { count, data } = await this.repository.getPagination(args as any);

    return {
      metadata: this.generateMetadata(count, page, limit),
      data,
    };
  }

  async getByIds(ids: number[]): Promise<T[]> {
    this.logger.debug(`Fetching dataloader with arg: ${JSON.stringify(ids)}`);
    const results = await this.repository.getByIds(ids);

    return results;
  }

  async create(data: DeepPartial<T>, createdBy?: User): Promise<T> {
    const createdById = createdBy?.id;
    this.logger.debug(
      `Create record by ${createdById} with arg: ${JSON.stringify(data)}`,
    );

    const result = await this.repository.create({
      ...data,
      created_by: createdById,
      updated_by: createdById,
    });

    return result;
  }

  async update(
    id: number,
    data: DeepPartial<T>,
    updatedBy?: User,
  ): Promise<T | null> {
    const updatedById = updatedBy?.id;
    this.logger.debug(
      `Update record by ${updatedById} with arg: ${JSON.stringify(data)}`,
    );

    const model = await this.repository.getOne({ where: { id } as any });

    if (!model) return null;

    Object.assign(model, data, { updated_by: updatedById });

    return await this.repository.save(model);
  }

  async delete(id: number, deletedBy?: User): Promise<boolean> {
    const deletedById = deletedBy?.id;
    this.logger.debug(`Delete record by ${deletedById} with id: ${id}`);

    const result = await this.repository.delete(id, deletedById);

    return result;
  }

  protected get logger() {
    return {
      debug: (message: string) => this._logger.debug(message, this.CLASS_NAME),
      error: (message: string) => this._logger.error(message, this.CLASS_NAME),
      log: (message: string) => this._logger.log(message, this.CLASS_NAME),
      verbose: (message: string) =>
        this._logger.verbose(message, this.CLASS_NAME),
      warn: (message: string) => this._logger.warn(message, this.CLASS_NAME),
    };
  }

  private generateMetadata(
    totalItem: number,
    page: number,
    pageSize: number,
  ): MetadataResponse {
    return {
      total_item: totalItem,
      total_page: Math.ceil(totalItem / pageSize),
      current_page: page,
      page_size: pageSize,
    };
  }
}
