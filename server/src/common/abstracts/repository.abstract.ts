import {
  Repository,
  DeepPartial,
  In,
  FindOptionsWhere,
  FindManyOptions,
  Not,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Like,
  ILike,
  IsNull,
  Between,
} from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IPagination } from '../graphql/query.input';
import { IWhere } from '../shared/types/where.type';

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

@Injectable()
export abstract class AbstractRepository<T> {
  private readonly CLASS_NAME = this.constructor.name;
  constructor(private readonly repository: Repository<T>) {}

  async getOne(
    options: {
      where?: IWhere<T>;
      select?: string[];
      relations?: string[];
    } = {},
  ): Promise<T | null> {
    const { where = {}, select, relations } = options;
    return await this.repository.findOne({
      where: this.parseQuery(where),
      select,
      relations,
    } as any);
  }

  async getPagination(options: {
    where?: Record<string, any>;
    pagination?: IPagination;
    order?: Record<string, 'ASC' | 'DESC'>;
    select?: string[];
    relations?: string[];
  }) {
    const {
      where,
      pagination: { page, limit },
      order,
      select,
      relations,
    } = options || {};

    const [data, count] = await this.repository.findAndCount({
      where: this.parseQuery(where),
      skip: (page - 1) * limit,
      take: limit,
      order,
      select,
      relations,
    } as FindManyOptions<T>);

    return { count, data };
  }

  async getByIds(ids: number[] = []): Promise<T[]> {
    return await this.repository.find({ where: { id: In(ids) } as any });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data as any);

    return await this.getOne({ where: { id } as any });
  }

  async save(data: DeepPartial<T>) {
    return await this.repository.save(data);
  }

  async delete(id: number, deletedById?: number): Promise<boolean> {
    if (deletedById) {
      await this.repository.update(id, { deleted_by: deletedById } as any);
    }
    const result = await this.repository.softDelete(id);

    return result.affected > 0;
  }

  protected parseQuery(query: Record<string, any>): FindOptionsWhere<T> {
    const parsedQuery: Record<string, any> = {};

    for (const key in query) {
      if (typeof query[key] === 'object' && query[key] !== null) {
        const operators = Object.keys(query[key]);
        let hasOperator = false;

        for (const op of operators) {
          if (operatorMap.has(op)) {
            parsedQuery[key] = operatorMap.get(op)!(query[key][op]);
            hasOperator = true;
          }
        }

        if (!hasOperator) {
          parsedQuery[key] = this.parseQuery(query[key]); // Handle nested objects
        }
      } else {
        parsedQuery[key] = query[key];
      }
    }

    return parsedQuery as FindOptionsWhere<T>;
  }
}
