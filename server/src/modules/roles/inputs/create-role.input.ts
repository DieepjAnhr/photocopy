import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'Username must be a string!' })
  @MinLength(4, { message: 'Username must be at least 4 characters long!' })
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Description must be a string!' })
  description?: string;

  @Field(() => [Int], { nullable: true })
  @IsOptional()
  @IsArray()
  permission_ids?: number[];
}
