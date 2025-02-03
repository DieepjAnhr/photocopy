type TEqual = { $eq: unknown };

type TNotEqual = { $ne: unknown };

type TLessThan = { $lt: number | Date };

type TLessThanOrEqual = { $lte: number | Date };

type TGreaterThan = { $gt: number | Date };

type TGreaterThanOrEqual = { $gte: number | Date };

type TIn<T> = { $in: T[keyof T][] };

type TNotIn = { $nIn: unknown[] };

type TContains = { $contains: string | number };

type TNotContains = { $nContains: unknown };

type TIContains = { $iContains: string | number };

type TNotIContains = { $nIContains: unknown };

type TNull = { $null: boolean };

type TNotNull = { $nNull: boolean };

type TBetween = {
  $between: [number, number] | [Date, Date] | [string, string];
};

export type FilterCondition<T> =
  | unknown
  | TEqual
  | TNotEqual
  | TLessThan
  | TLessThanOrEqual
  | TGreaterThan
  | TGreaterThanOrEqual
  | TIn<T>
  | TNotIn
  | TContains
  | TNotContains
  | TIContains
  | TNotIContains
  | TNull
  | TNotNull
  | TBetween;

export type Filter<T> = { [P in keyof T]?: FilterCondition<T> } | T;
