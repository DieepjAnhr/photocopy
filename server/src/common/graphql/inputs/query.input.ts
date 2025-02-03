import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { GraphQLJSON } from 'graphql-scalars';

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

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 50 })
  limit?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  @Type(() => Object)
  orderBy?: Record<string, 'ASC' | 'DESC'>;
}

@InputType()
export class GetOneInput<T> {
  @Field(() => GraphQLJSON, { nullable: true, defaultValue: '{}' })
  @Type(() => Object)
  where?: Partial<Record<keyof T, unknown>>;
}
