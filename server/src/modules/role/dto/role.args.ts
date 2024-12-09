import { Field, ID, InputType } from '@nestjs/graphql';
import { AbstractArgs } from 'src/common/abstracts/args.abstract';

@InputType()
export class RoleFilter {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class RoleArgs extends AbstractArgs {
  @Field(() => RoleFilter, { nullable: true })
  filter?: RoleFilter;
}
