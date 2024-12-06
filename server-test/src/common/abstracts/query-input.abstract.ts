import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class IPagination {
  @Field(() => Number)
  @IsNotEmpty()
  page: number;

  @Field(() => Number)
  @IsNotEmpty()
  limit: number;
}

@InputType()
export class AbstractQueryInput {
  @Field(() => IPagination, { nullable: true })
  @IsOptional()
  pagination?: IPagination;
}
