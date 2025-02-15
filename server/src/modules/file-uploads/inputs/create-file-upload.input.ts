import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateFileUploadInput {
  @Field(() => String)
  @IsString({ message: 'Tên file cần là chuỗi ký tự!' })
  name: string;

  @Field(() => String)
  @IsString({ message: 'Url cần là chuỗi ký tự!' })
  url: string;
}
