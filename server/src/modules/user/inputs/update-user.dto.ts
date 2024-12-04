import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserInput } from './create-user.dto';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsNotEmpty()
  id: number;
}
