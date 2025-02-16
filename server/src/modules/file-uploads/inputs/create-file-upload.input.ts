import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  EFileStatus,
  EFileType,
} from 'src/common/shared/enums/file-upload.enum';

registerEnumType(EFileStatus, {
  name: 'EFileStatus',
  description: 'Enum for file upload status',
});

registerEnumType(EFileType, {
  name: 'EFileType',
  description: 'Enum for file upload type',
});

@InputType()
export class CreateFileUploadInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'Tên file cần là chuỗi ký tự!' })
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString({ message: 'Url cần là chuỗi ký tự!' })
  url: string;

  @Field(() => EFileType)
  @IsNotEmpty()
  @IsEnum(EFileType, {
    message: `Chỉ áp dụng các giá trị ${Object.values(EFileType).join(', ')}!`,
  })
  type: string;

  @Field(() => EFileStatus)
  @IsOptional()
  @IsEnum(EFileStatus, {
    message: `Chỉ áp dụng các giá trị ${Object.values(EFileStatus).join(', ')}!`,
  })
  status: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsNumber()
  owner_by: number;
}
