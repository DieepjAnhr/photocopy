import { Field, ID, InputType } from '@nestjs/graphql';
import { JSONResolver as JSON } from 'graphql-scalars';
import { AbstractArgs } from 'src/common/abstracts/args.abstract';

@InputType()
export class UserArgs extends AbstractArgs {
  @Field(() => JSON, { nullable: true })
  filter?: Record<string, any>;
}
