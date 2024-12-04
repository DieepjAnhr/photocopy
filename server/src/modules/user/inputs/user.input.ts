import { Field, ID, InputType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class BaseUserInput implements Partial<User> {
  @Field(() => ID, { nullable: true })
  role_id?: number;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  first_name?: string;

  @Field(() => String, { nullable: true })
  last_name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  creator_id?: number;

  @Field(() => Date, { nullable: true })
  created_at?: Date;

  @Field(() => String, { nullable: true })
  updater_id?: number;

  @Field(() => Date, { nullable: true })
  updated_at?: Date;
}

@InputType()
export class CreateUserInput extends BaseUserInput {
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
  last_name: string;

  @Field(() => String)
  @IsNotEmpty()
  phone: string;

  @Field(() => String)
  @IsNotEmpty()
  email: string;
}

@InputType()
export class UpdateUserInput extends BaseUserInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: number;
}
