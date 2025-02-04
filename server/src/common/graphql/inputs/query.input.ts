import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { GraphQLJSON } from 'graphql-scalars';

export enum EQueryType {
  ALL = 'all',
  DATA = 'data',
  COUNT = 'count',
}
registerEnumType(EQueryType, {
  name: 'QueryTypeEnum',
  description: 'Defines the type of query to perform: all, data, or count',
});

@InputType()
export class IPagination {
  @Field(() => Int, { description: 'Page number starting from 1' })
  @IsInt()
  @Min(1)
  page: number;

  @Field(() => Int, { description: 'Number of items per page' })
  @IsInt()
  @Min(1)
  limit: number;
}

@InputType()
export class GetManyInput<T> {
  @Field(() => GraphQLJSON, { nullable: true, defaultValue: '{}' })
  @Type(() => Object)
  where?: Partial<Record<keyof T, unknown>>;

  @Field(() => IPagination, { nullable: true })
  pagination?: IPagination;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  @Type(() => Object)
  order?: Record<string, 'ASC' | 'DESC'>;

  @Field(() => EQueryType, {
    nullable: true,
    defaultValue: EQueryType.ALL,
  })
  query_type?: EQueryType;
}

@InputType()
export class GetOneInput<T> {
  @Field(() => GraphQLJSON, { nullable: true, defaultValue: '{}' })
  @Type(() => Object)
  where?: Partial<Record<keyof T, unknown>>;
}
