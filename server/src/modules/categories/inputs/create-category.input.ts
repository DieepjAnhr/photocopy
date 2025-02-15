import { Field, InputType, ID } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { nullable: true })
  @IsString({ message: 'Tên nhóm cần là chuỗi ký tự!' })
  name: string;

  @Field(() => ID)
  @IsNumber()
  parent_id?: number;

  @Field(() => ID, { nullable: true })
  @IsArray()
  children_ids?: number[];

  @Field(() => String, { nullable: true })
  @IsString({ message: 'Mô tả cần là chuỗi ký tự' })
  description?: string;
}
