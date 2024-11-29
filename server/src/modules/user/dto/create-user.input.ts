import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => ID)
  role_id: number;

  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  avatar: string;
}
