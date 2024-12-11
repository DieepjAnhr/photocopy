import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsInt, Min } from 'class-validator';

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
export class AbstractArgs {
  @Field(() => IPagination, { nullable: true })
  @IsOptional()
  pagination?: IPagination;
}
