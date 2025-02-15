import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsString({ message: 'Username must be a string!' })
  @MinLength(4, { message: 'Username must be at least 4 characters long!' })
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Description must be a string!' })
  description?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  permission_ids?: number[];
}
