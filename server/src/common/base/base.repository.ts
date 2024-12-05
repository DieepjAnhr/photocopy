import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, isNotEmptyObject, validate } from 'class-validator';
import { IFilter } from 'src/modules/blog/inputs/blog.input';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { IQueryFieldInput } from '../graphql/type';
import { ISort, QueryOutputType } from './base.input';
import { BadRequestException } from '@nestjs/common';

@InputType()
export class IPagination {
  @Field(() => Int, { description: 'Started from 1' })
  @IsNotEmpty()
  page: number;

  @Field(() => Int, { description: 'Number of elements on the page' })
  @IsNotEmpty()
  limit: number;
}

export interface IGrapQLQuery<T> {
  filter?: Record<string, T>;
  pagination?: IPagination;
  sort?: [ISort];
  output_type?: QueryOutputType;
}

export interface IGetData<T> {
  count?: number;
  data?: T[];
}

const isEmptyObject = <T extends Object>(value: T): boolean => {
  return !value || Object.keys(value).length === 0;
};

const QUERY_TYPES = ['data', 'count', 'all'];

export class AbstractBaseRepository<
  T extends ObjectLiteral,
> extends Repository<T> {
  async getOne() {}
  async getMany({
    filter,
    pagination,
    sort,
    output_type: outputType,
  }: IGrapQLQuery<T>): Promise<IGetData<T>> {
    const dataType = outputType ?? 'all';
    const condition = {
      ...(pagination && {
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
      }),
    };

    const result = {
      data: async () => ({ data: await this.find(condition) }),
      count: async () => ({ count: await this.count(condition) }),
      all: async () => {
        const [data, count] = await this.findAndCount(condition);
        return { data, count };
      },
    };

    return await result[dataType]();
  }

  // async getmany(
  //   { pagination, where, order, relations }: RepoQuery<T>,
  //   gqlQuery?: string,
  //   _dataType?: 'count' | 'data' | 'all',
  // ): Promise<IGetData<T>> {
  //   const dataType =
  //     _dataType ??
  //     (!gqlQuery
  //       ? 'all'
  //       : gqlQuery.includes('count') && gqlQuery.includes('data')
  //         ? 'all'
  //         : gqlQuery.includes('data')
  //           ? 'data'
  //           : 'count');

  //   const result = {
  //     data: async () => ({ data: await this.find() }),
  //     count: async () => ({ count: await this.count() }),
  //     all: async () => {
  //       const [data, count] = await this.findAndCount();
  //       return { data, count };
  //     },
  //   };

  //   return await result[dataType]();
  // }
}
