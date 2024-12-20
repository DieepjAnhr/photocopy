import { Field, ID, InputType } from '@nestjs/graphql';
import { AbstractArgs } from 'src/common/graphql/inputs/get-many.input';

@InputType()
export class PermissionFilter {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  label?: string;

  @Field(() => String, { nullable: true })
  value?: string;
}

@InputType()
export class PermissionArgs extends AbstractArgs {
  @Field(() => PermissionFilter, { nullable: true })
  filter?: PermissionFilter;
}
