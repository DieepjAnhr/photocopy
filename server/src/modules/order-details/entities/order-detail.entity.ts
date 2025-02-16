import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Variant } from 'src/modules/variants/entities/variant.entity';

@ObjectType({ description: 'order_detail' })
@Entity({ name: 'order_details' })
export class OrderDetail extends AbstractEntity {
  @Field(() => ID)
  @Column()
  order_id: number;

  @Field(() => ID)
  @Column()
  product_id: number;

  @Field(() => ID)
  @Column()
  variant_id: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  quantity: number;

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

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [ID])
  @Column('int', { array: true })
  service_detail_ids: number[];

  @Field(() => [ID])
  @Column('int', { array: true })
  tax_detail_ids: number[];

  @Field(() => [ID])
  @Column('int', { array: true })
  discount_detail_ids: number[];

  @ManyToOne(() => Order, (order) => order.order_details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Variant, (variant) => variant.order_details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variant_id' })
  variant: Variant;
}

@ObjectType()
export class GetOrderDetailType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [OrderDetail], { nullable: true })
  data?: OrderDetail[];
}
