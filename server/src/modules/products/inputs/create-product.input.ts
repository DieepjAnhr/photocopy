import { Field, InputType, ID, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { EProductStatus } from 'src/common/shared/enums/product.enum';

registerEnumType(EProductStatus, {
  name: 'EProductStatus',
  description: 'Enum for product statuses',
});

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  sku?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  code?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  images?: string[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  regular_price: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  sale_price?: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsNumber()
  like: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsNumber()
  rate: number;

  @Field(() => EProductStatus)
  @IsNotEmpty()
  @IsEnum(EProductStatus, {
    message: `Chỉ áp dụng các giá trị ${Object.values(EProductStatus).join(', ')}!`,
  })
  status: string;

  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;

  @Field(() => [ID])
  @IsArray()
  category_ids: number[];

  @Field(() => [ID])
  @IsArray()
  attribute_ids: number[];

  @Field(() => [ID])
  @IsArray()
  variant_ids: number[];
}
