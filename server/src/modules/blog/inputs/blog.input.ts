import { Field, ID, InputType, PartialType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Blog } from '../entities/blog.entity';
import { AbstractBaseQueryInput } from 'src/common/base/base.input';
import { QueryFieldScalar } from 'src/common/graphql/scalars/query.input';
import { IQueryFieldInput } from 'src/common/graphql/type';

@InputType()
export class IFilter {
  @Field(() => QueryFieldScalar, { nullable: true })
  title?: IQueryFieldInput;

  @Field(() => QueryFieldScalar, { nullable: true })
  content?: IQueryFieldInput;
}

@InputType()
export class QueryBlogInput extends AbstractBaseQueryInput {
  @Field(() => IFilter, { nullable: true })
  filter?: IFilter;
}

@InputType()
export class CreateBlogInput extends OmitType(Blog, [
  'id',
  'creator_id',
  'created_at',
  'updater_id',
  'updated_at',
] as const) {
  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  content: string;
}

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
  @Field(() => ID)
  @IsNotEmpty()
  id: number;
}
