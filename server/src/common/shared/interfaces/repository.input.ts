import { IPagination } from 'src/common/graphql/query.input';
import { IWhere } from '../types/where.type';
import { FindOptionsOrder } from 'typeorm';

export interface IRepoQueryMany<T> {
  where?: IWhere<T>;
  select?: string[];
  relations?: string[];

  pagination?: IPagination;
  order?: FindOptionsOrder<T>;
}

export interface IRepoQueryOne<T> {
  where?: IWhere<T>;
  select?: string[];
  relations?: string[];
}
