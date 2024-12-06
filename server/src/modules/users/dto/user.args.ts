import { Field, ID, InputType } from '@nestjs/graphql';
import { AbstractArgs } from 'src/common/abstracts/args.abstract';

@InputType()
export class UserArgs extends AbstractArgs {
  @Field(() => ID, { nullable: true })
  id?: number;
}
