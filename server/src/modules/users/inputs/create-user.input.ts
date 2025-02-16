import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'Phone must be a string!' })
  @Matches(/^\+?[1-9]\d{1,14}$|^0\d{9}$/, {
    message: 'Phone number must be in E!164 format!',
  })
  phone: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'Password must be a string!' })
  @MinLength(4, { message: 'Password must be at least 4 characters long!' })
  password: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'First name must be a string!' })
  first_name?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'Last name must be a string!' })
  last_name: string;

  @Field(() => String)
  @IsOptional()
  @IsEmail({}, { message: 'Email is not valid!' })
  email?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate({ message: 'Birthday must be a date!' })
  birthday?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Avatar must be a url!' })
  avatar?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  role_ids?: number[];
}
