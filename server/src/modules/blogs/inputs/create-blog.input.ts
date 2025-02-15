import { Field, InputType, ID } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateBlogInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Tiêu đề bài viết cần là chuỗi ký tự!' })
  title: string;

  @Field(() => String)
  @IsString({ message: 'Nội dung bài viết cần là chuỗi ký tự' })
  content: string;

  @Field(() => ID, { nullable: true })
  @IsArray()
  category_ids: number[];
}
