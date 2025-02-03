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

export abstract class AbstractRepository<T> extends Repository<T> {
  async getOne(filters: Filter<T>) {
    return await this.findOne({ where: this.handleFilter(filters) });
  }

  async getMany(filters: Filter<T>) {
    return await this.find({ where: this.handleFilter(filters) });
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
