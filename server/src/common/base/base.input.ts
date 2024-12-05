import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class IPagination {
  @Field(() => Int, { description: 'Started from 1' })
  @IsNotEmpty()
  page: number;

  @Field(() => Int, { description: 'Number of elements on the page' })
  @IsNotEmpty()
  limit: number;
}

@InputType()
export class ISort {
  @Field(() => String, { description: 'Sort by field' })
  @IsNotEmpty()
  field: string;

  @Field(() => String, { description: 'Started from 1' })
  @IsNotEmpty()
  type: string;
}

export enum QueryOutputType {
  ALL = 'all',
  DATA = 'data',
  COUNT = 'count',
}

@InputType()
export abstract class AbstractBaseQueryInput {
  @Field(() => [ISort], { nullable: true })
  @IsOptional()
  sort?: ISort[];

  @Field(() => IPagination, { nullable: true })
  @IsOptional()
  pagination?: IPagination;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(QueryOutputType, {
    message: 'output_type must be one of all, count, or data',
  })
  @IsIn([QueryOutputType.ALL, QueryOutputType.COUNT, QueryOutputType.DATA], {
    message: 'output_type must be one of all, count, or data',
  })
  output_type?:
    | QueryOutputType.ALL
    | QueryOutputType.COUNT
    | QueryOutputType.DATA;
}
