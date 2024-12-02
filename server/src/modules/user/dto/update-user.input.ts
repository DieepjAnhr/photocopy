import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsNotEmpty()
  id: number;

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
