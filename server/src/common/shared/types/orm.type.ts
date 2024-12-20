import { IPagination } from 'src/common/graphql/inputs/get-many.input';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhereProperty,
} from 'typeorm';

type TNotEqual = {
  $ne: unknown;
};

// Less than
type TLessThan = {
  $lt: number | Date;
};

// Less than or equal
type TLessThanOrEqual = {
  $lte: number | Date;
};

// Greater than
type TGreaterThan = {
  $gt: number | Date;
};

// Greater than or equal
type TGreaterThanOrEqual = {
  $gte: number | Date;
};

// In
type TIn<T> = {
  $in: T[keyof T][];
};

// Not in
type TNotIn = {
  $nIn: unknown[];
};

// Contains(Case-sensitive)
type TContains = {
  $contains: string | number;
};

// Not contains(Case-sensitive)
type TNotContains = {
  $nContains: unknown;
};

// Contains(Case-insensitive)
type TIContains = {
  $iContains: string | number;
};

// Not contains(Case-insensitive)
type TNotIContains = {
  $nIContains: unknown;
};

// Is null
type TNull = {
  $null: boolean;
};

// Is not null
type TNotNull = {
  $nNull: boolean;
};

// Is between
type TBetween = {
  $between: [number, number] | [Date, Date] | [string, string];
};

export type OperatorType<T> =
  | TNotEqual
  | TLessThan
  | TLessThanOrEqual
  | TGreaterThan
  | TGreaterThanOrEqual
  | TIn<T>
  | TNotIn
  | TContains
  | TNotContains
  | TNull
  | TNotNull
  | TBetween
  | TIContains
  | TNotIContains;

type ExtendedFindOptionsWhere<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
  ? unknown
  :
  | FindOptionsWhereProperty<NonNullable<Entity[P]>>
  | OperatorType<Entity>
  | Entity[P]
  | ExtendedFindOptionsWhere<Entity>;
};
export type IWhere<T> =
  | ExtendedFindOptionsWhere<T>
  | ExtendedFindOptionsWhere<T>[];

export interface GetManyQuery<T> {
  where?: IWhere<T>;
  pagination?: IPagination;
  order?: FindOptionsOrder<T>;
  relations?: FindOptionsRelations<T>;
}

export type GetOneQuery<T> = Required<Pick<GetManyQuery<T>, 'where'>> &
  Pick<GetManyQuery<T>, 'relations'>;
