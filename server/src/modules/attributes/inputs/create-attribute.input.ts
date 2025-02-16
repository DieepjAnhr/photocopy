import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAttributeInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Loại thuộc tính cần là chuỗi ký tự!' })
  type: string;

  @Field(() => String)
  @IsString({ message: 'Giá trị thuộc tính cần là chuỗi ký tự' })
  value: string;
}
