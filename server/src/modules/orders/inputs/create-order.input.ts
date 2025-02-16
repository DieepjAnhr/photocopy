import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  EOrderStatus,
  EPaymentStatus,
  EShippingStatus,
} from 'src/common/shared/enums/order.enum';

registerEnumType(EOrderStatus, {
  name: 'EOrderStatus',
  description: 'Enum for order statuses',
});

registerEnumType(EShippingStatus, {
  name: 'EShippingStatus',
  description: 'Enum for shipping statuses',
});

registerEnumType(EPaymentStatus, {
  name: 'EPaymentStatus',
  description: 'Enum for payment statuses',
});

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

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

  @Field(() => EOrderStatus)
  @IsOptional()
  @IsEnum(EOrderStatus, {
    message: `Chỉ áp dụng các giá trị ${Object.values(EOrderStatus).join(', ')}!`,
  })
  status: string;

  @Field(() => EShippingStatus)
  @IsEnum(EShippingStatus, {
    message: `Chỉ áp dụng các giá trị ${Object.values(EShippingStatus).join(', ')}!`,
  })
  shipping_status: string;

  @Field(() => EPaymentStatus)
  @IsEnum(EShippingStatus, {
    message: `Chỉ áp dụng các giá trị ${Object.values(EShippingStatus).join(', ')}!`,
  })
  payment_status: string;

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

  @Field(() => [Int])
  @IsOptional()
  @IsArray()
  order_detail_ids: number[];
}
