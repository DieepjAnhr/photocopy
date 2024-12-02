import { InputType, Field, ID, PartialType, Int } from '@nestjs/graphql';
import { CreateRoleInput } from './create-role.dto';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => Int)
  id: number;
}