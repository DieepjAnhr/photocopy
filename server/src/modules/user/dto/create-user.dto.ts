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
  @IsString({ message: 'Phone must be a string!' })
  @Matches(/^\+?[1-9]\d{1,14}$|^0\d{9}$/, {
    message: 'Phone number must be in E!164 format!',
  })
  phone: string;

  @Field(() => String)
  @IsString({ message: 'Password must be a string!' })
  @MinLength(4, { message: 'Password must be at least 4 characters long!' })
  password: string;

  @Field(() => [ID], { nullable: true })
  role_ids?: number[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'First name must be a string!' })
  first_name?: string;

  @Field(() => String)
  @IsString({ message: 'Last name must be a string!' })
  last_name: string;

  @Field(() => String)
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
}
