import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, isNotEmptyObject, validate } from 'class-validator';
import { QueryUserInput } from 'src/modules/user/dto/query-user.dto';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

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
  count?: number,
  data?: T[],
}

const isEmptyObject = <T extends Object>(value: T): boolean => {
  return !value || Object.keys(value).length === 0;
};

const QUERY_TYPES = ['data', 'count', 'all']

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  async getOne() { }

  async getMany(
    { pagination, queryType }: QueryUserInput,
  ): Promise<IGetData<T>> {
    // const { pagination, where, order, relations } = query || {};

    // const condition: FindManyOptions<T> = {
    //   ...(where && !isEmptyObject(where) && { where }),
    //   ...(order && { order }),
    //   ...(relations && { relations }),
    //   ...(pagination && {
    //     skip: (pagination.page - 1) * pagination.limit,
    //     take: pagination.limit,
    //   }),
    // };

    if (!queryType) queryType = 'all';

    const result = {
      data: async () => ({ data: await this.find() }),
      count: async () => ({ count: await this.count() }),
      all: async () => {
        const [data, count] = await this.findAndCount();
        return { count, data };
      },
    };

    return result['all']();
  }
}
