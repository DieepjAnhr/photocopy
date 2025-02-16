import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';
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

@ObjectType({ description: 'order' })
@Entity({ name: 'orders' })
export class Order extends AbstractEntity {
  @Field(() => ID)
  @Column()
  customer_id: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  total_cost: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  service_fee: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  tax: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  discount: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  final_cost: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  paid: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  remaining: number;

  @Field(() => EOrderStatus)
  @Column({ type: 'enum', enum: EOrderStatus })
  status: string;

  @Field(() => EShippingStatus)
  @Column({ type: 'enum', enum: EShippingStatus })
  shipping_status: string;

  @Field(() => EPaymentStatus)
  @Column({ type: 'enum', enum: EPaymentStatus })
  payment_status: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [ID])
  @Column('int', { array: true })
  order_detail_ids: number[];

  @Field(() => [ID])
  @Column('int', { array: true })
  service_detail_ids: number[];

  @Field(() => [ID])
  @Column('int', { array: true })
  tax_detail_ids: number[];

  @Field(() => [ID])
  @Column('int', { array: true })
  discount_detail_ids: number[];

  @Field(() => [ID])
  @Column('int', { array: true })
  payment_detail_ids: number[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
  })
  order_details: OrderDetail[];
}

@ObjectType()
export class GetOrderType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Order], { nullable: true })
  data?: Order[];
}
