import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

@InputType()
export class CreateVariantInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  sku?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  code?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  status: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  regular_price: number;

  @Field(() => Int, { nullable: true })
  @IsNotEmpty()
  @IsNumber()
  sale_price?: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;

  @Field(() => [Int])
  @IsArray()
  image_ids: number[];

  @Field(() => [Int])
  @IsArray()
  attribute_ids: number[];
}
