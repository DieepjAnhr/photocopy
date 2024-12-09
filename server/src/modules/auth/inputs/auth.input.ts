import { Field, InputType } from '@nestjs/graphql';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

@InputType()
export class SignInInput {
  @Field(() => String)
  @IsString({ message: 'Username must be a string!' })
  @MinLength(4, { message: 'Username must be at least 4 characters long!' })
  username: string;

  @Field(() => String)
  @IsString({ message: 'Password must be a string!' })
  @MinLength(6, { message: 'Password must be at least 6 characters long!' })
  password: string;
}

@InputType()
export class SignUpInput extends SignInInput {
  @Field(() => String)
  @IsString({ message: 'Last name must be a string!' })
  last_name: string;

  @Field(() => String)
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be in E!164 format!',
  })
  phone: string;

  @Field(() => String)
  @IsEmail({}, { message: 'Email is not valid!' })
  email: string;
}
