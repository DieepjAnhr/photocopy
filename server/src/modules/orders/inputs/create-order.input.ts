import { Field, InputType, ID, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @Field(() => [ID])
  @IsArray()
  order_detail_ids: number[];

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

  @Field(() => [ID], { defaultValue: [] })
  @IsOptional()
  @IsArray()
  service_detail_ids?: number[];

  @Field(() => [ID], { defaultValue: [] })
  @IsOptional()
  @IsArray()
  tax_detail_ids?: number[];

  @Field(() => [ID], { defaultValue: [] })
  @IsOptional()
  @IsArray()
  discount_detail_ids?: number[];
}
