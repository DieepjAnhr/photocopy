import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePermissionInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  value: string;
}
