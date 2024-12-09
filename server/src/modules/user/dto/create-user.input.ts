import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString({ message: 'Username must be a string!' })
  @MinLength(4, { message: 'Username must be at least 4 characters long!' })
  username: string;

  @Field(() => String)
  @IsString({ message: 'Password must be a string!' })
  @MinLength(6, { message: 'Password must be at least 6 characters long!' })
  password: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  role_id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'First name must be a string!' })
  first_name?: string;

  @Field(() => String)
  @IsString({ message: 'Last name must be a string!' })
  last_name: string;

  @Field(() => String)
  @Matches(/^\+?[1-9]\d{1,14}$|^0\d{9}$/, {
    message: 'Phone number must be in E!164 format!',
  })
  phone: string;

  @Field(() => String)
  @IsEmail({}, { message: 'Email is not valid!' })
  email: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate({ message: 'Birthday must be a date!' })
  birthday?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Avatar must be a url!' })
  avatar?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  refresh_token?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  role_ids?: number[];
}
