import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePermissionInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'Label must be a string!' })
  label: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'Value must be a string!' })
  value: string;
}
