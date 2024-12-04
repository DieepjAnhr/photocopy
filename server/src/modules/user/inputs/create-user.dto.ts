import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => ID)
  @IsNotEmpty()
  role_id: number;

  @Field(() => String)
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  first_name: string;

  @Field(() => String)
  @IsNotEmpty()
  last_name: string;

  @Field(() => String)
  @IsNotEmpty()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  avatar?: string;

  @Field(() => ID)
  @IsNotEmpty()
  creator_id: number;

  @Field(() => ID)
  @IsNotEmpty()
  updater_id: number;
}
