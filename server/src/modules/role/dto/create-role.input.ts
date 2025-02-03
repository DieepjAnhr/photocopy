import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string!' })
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Description must be a string!' })
  description?: string;

  @Field(() => String, {
    nullable: true,
    description: 'permission ids split by comma (),',
  })
  @IsOptional()
  permission_ids?: string;
}
