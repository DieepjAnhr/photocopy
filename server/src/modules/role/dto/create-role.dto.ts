import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsOptional()
  description?: string;

  @Field(() => ID)
  @IsNotEmpty()
  creator_id: number;

  @Field(() => ID)
  @IsNotEmpty()
  updater_id: number;

  @Field(() => [ID])
  @IsOptional()
  permission_ids?: number[];
}
