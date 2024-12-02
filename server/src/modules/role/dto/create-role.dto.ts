import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  description: string;

  @Field(() => ID)
  @IsNotEmpty()
  creator_id: number;

  @Field(() => ID)
  @IsNotEmpty()
  updater_id: number;
}
