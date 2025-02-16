import { Field, InputType, registerEnumType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ECategoryType } from 'src/common/shared/enums/category.enum';

registerEnumType(ECategoryType, {
  name: 'ECategoryType',
  description: 'Enum for category types',
});

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'Tên nhóm cần là chuỗi ký tự!' })
  name: string;

  @Field(() => ECategoryType)
  @IsNotEmpty()
  @IsEnum(ECategoryType, {
    message: `Chỉ áp dụng các giá trị ${Object.values(ECategoryType).join(', ')}!`,
  })
  type: string;

  @Field(() => Int, { nullable: true, defaultValue: null })
  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Mô tả cần là chuỗi ký tự' })
  description?: string;

  @Field(() => [Int], { nullable: true })
  @IsOptional()
  @IsArray()
  children_ids?: number[];
}
