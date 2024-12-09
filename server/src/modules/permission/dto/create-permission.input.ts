import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePermissionInput {
  @Field(() => String)
  @IsString({ message: 'Label must be a string!' })
  label: string;

  @Field(() => String)
  @IsString({ message: 'Value must be a string!' })
  value: string;
}
