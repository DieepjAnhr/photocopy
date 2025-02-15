import { Field, InputType, ID, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

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

  @Field(() => [ID])
  @IsArray()
  category_ids: number[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  images?: string[];

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

  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;
}
