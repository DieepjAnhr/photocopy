import { Field, ID, InputType } from '@nestjs/graphql';

import { IsNotEmpty, IsOptional } from 'class-validator';

import { User } from './user.entity';

@InputType()
export class CreateUserInput implements Partial<User> {
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

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  role_id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  avatar?: string;
}

@InputType()
export class UserIdInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: number;
}
