import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, isNotEmptyObject, validate } from 'class-validator';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { RepoQuery } from '../graphql/types';

@InputType()
export class IPagination {
  @Field(() => Int, { description: 'Started from 1' })
  @IsNotEmpty()
  page: number;

  @Field(() => Int, { description: 'Number of elements on the page' })
  @IsNotEmpty()
  limit: number;
}

export interface IRepositoryQuery<T> {
  pagination?: IPagination;
  where?: FindOptionsWhere<T>[] | FindOptionsWhere<T>;
  order?: FindOptionsOrder<T>;
  relations?: FindOptionsRelations<T>;
}

export interface IGetData<T> {
  count?: number;
  data?: T[];
}

const isEmptyObject = <T extends Object>(value: T): boolean => {
  return !value || Object.keys(value).length === 0;
};

const QUERY_TYPES = ['data', 'count', 'all'];

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  async getOne() { }

  async getmany(
    { pagination, where, order, relations }: RepoQuery<T>,
    gqlQuery?: string,
    _dataType?: 'count' | 'data' | 'all',
  ): Promise<IGetData<T>> {
    const dataType =
      _dataType ??
      (!gqlQuery
        ? 'all'
        : gqlQuery.includes('count') && gqlQuery.includes('data')
          ? 'all'
          : gqlQuery.includes('data')
            ? 'data'
            : 'count');

    const result = {
      data: async () => ({ data: await this.find() }),
      count: async () => ({ count: await this.count() }),
      all: async () => {
        const [data, count] = await this.findAndCount();
        return { data, count };
      },
    };

    return await result[dataType]();
  }
}
