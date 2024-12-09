import { Field, ID, InputType } from '@nestjs/graphql';
import { AbstractArgs } from 'src/common/abstracts/args.abstract';

@InputType()
export class UserFilter {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  username?: string;
}

@InputType()
export class UserArgs extends AbstractArgs {
  @Field(() => UserFilter, { nullable: true })
  filter?: UserFilter;
}
