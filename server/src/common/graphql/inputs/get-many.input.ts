import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsInt, Min, IsNotEmpty } from 'class-validator';
import { GraphQLJSON } from 'graphql-scalars';
import { IWhere } from 'src/common/shared/types/orm.type';
import { FindOptionsOrder } from 'typeorm';

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
  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  where?: IWhere<T>;

  @Field(() => IPagination, { nullable: true })
  @IsOptional()
  pagination?: IPagination;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  order?: FindOptionsOrder<T>;
}

@InputType()
export class GetOneInput<T> {
  @Field(() => GraphQLJSON)
  @IsNotEmpty()
  where: IWhere<T>;
}
