import {
  FindOptionsWhere,
  Repository,
  Between,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { Filter, FilterCondition } from '../shared/types/orm.type';
import { BadRequestException } from '@nestjs/common';
import {
  EQueryType,
  GetManyInput,
  GetOneInput,
} from '../graphql/inputs/query.input';

export abstract class AbstractRepository<T> extends Repository<T> {
  async getOne(args: GetOneInput<T>) {
    return await this.findOne({ where: this.handleFilter(args?.where) });
  }

  async getByQuery(args: GetManyInput<T>) {
    const { query_type: queryType } = args || {};

    if (queryType === EQueryType.DATA)
      return { data: await this.getMany(args) };
    if (queryType === EQueryType.COUNT)
      return { count: await this.countMany(args) };
    const [data, count] = await this.getAndCountMany(args);
    return { count, data };
  }

  async getMany(args: GetManyInput<T>) {
    return await this.find(this.getCondition(args));
  }

  async countMany(args: GetManyInput<T>) {
    return await this.count(this.getCondition(args));
  }

  async getAndCountMany(args: GetManyInput<T>) {
    return await this.findAndCount(this.getCondition(args));
  }

  private getCondition(args: GetManyInput<T>) {
    const { where, pagination } = args || {};
    const { page, limit } = pagination || {};

    return {
      ...(where && { where: this.handleFilter(where) }),
      ...(pagination && {
        skip: (page - 1) * limit,
        take: limit,
      }),
    };
  }

  private handleFilter(filters?: Filter<T> | string): FindOptionsWhere<T> {
    if (!filters) return {};
    if (typeof filters === 'string') filters = JSON.parse(filters);

    const where: FindOptionsWhere<T> = {};
    for (const [key, value] of Object.entries(filters)) {
      where[key] = this.handleOperator(value);
    }
    return where;
  }

  private handleOperator(value: FilterCondition<T>) {
    if (typeof value !== 'object' || value === null) return value;

    const [operator, operand] = Object.entries(value)[0] ?? [];
    if (!operator) return value;

    const operatorMap = new Map<string, (val: any) => unknown>([
      ['$eq', (val) => val],
      ['$ne', (val) => Not(val)],
      ['$lt', (val) => LessThan(val)],
      ['$lte', (val) => LessThanOrEqual(val)],
      ['$gt', (val) => MoreThan(val)],
      ['$gte', (val) => MoreThanOrEqual(val)],
      ['$in', (val) => In(Array.isArray(val) ? val : [val])],
      ['$nIn', (val) => Not(In(Array.isArray(val) ? val : [val]))],
      ['$contains', (val) => Like(`%${val}%`)],
      ['$nContains', (val) => Not(Like(`%${val}%`))],
      ['$iContains', (val) => ILike(`%${val}%`)],
      ['$nIContains', (val) => Not(ILike(`%${val}%`))],
      ['$null', () => IsNull()],
      ['$nNull', () => Not(IsNull())],
      [
        '$between',
        (val) => {
          if (!Array.isArray(val) || val.length !== 2) {
            throw new BadRequestException(
              'Invalid $between value, must be [min, max]',
            );
          }
          return Between(val[0], val[1]);
        },
      ],
    ]);

    if (operatorMap.has(operator)) return operatorMap.get(operator)(operand);

    throw new BadRequestException(`Invalid operator ${operator}`);
  }
}
