import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateOrderDetailInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  variant_id: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsNotEmpty()
  @IsNumber()
  total_cost: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  service_fee?: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  tax?: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsNotEmpty()
  @IsNumber()
  final_cost: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => [Int], { defaultValue: [] })
  @IsOptional()
  @IsArray()
  service_detail_ids?: number[];

  @Field(() => [Int], { defaultValue: [] })
  @IsOptional()
  @IsArray()
  tax_detail_ids?: number[];

  @Field(() => [Int], { defaultValue: [] })
  @IsOptional()
  @IsArray()
  discount_detail_ids?: number[];
}
