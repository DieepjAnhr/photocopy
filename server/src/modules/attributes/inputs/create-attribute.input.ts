import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAttributeInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Tiêu đề bài viết cần là chuỗi ký tự!' })
  type: string;

  @Field(() => String)
  @IsString({ message: 'Nội dung bài viết cần là chuỗi ký tự' })
  value: string;
}
