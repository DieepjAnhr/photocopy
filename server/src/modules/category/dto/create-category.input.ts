import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string!' })
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'Content must be a string!' })
  content: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Description must be a string!' })
  description?: string;
}
