import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

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
export class BaseQueryInput {
  @Field(() => IPagination)
  @IsOptional()
  pagination?: IPagination;
}
