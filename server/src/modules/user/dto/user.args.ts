import { Field, ID, InputType } from '@nestjs/graphql';
import { JSONResolver as JSON } from 'graphql-scalars';
import { AbstractArgs } from 'src/common/abstracts/args.abstract';

@InputType()
export class UserFilter {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => JSON, { nullable: true })
  test?: Record<string, any>;
}

@InputType()
export class UserArgs extends AbstractArgs {
  @Field(() => UserFilter, { nullable: true })
  filter?: UserFilter;
}
