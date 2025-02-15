import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';

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

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => String)
  @Column()
  shipping_status: string;

  @Field(() => String)
  @Column()
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

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
  })
  order_details: OrderDetail[];

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsertOrUpdate() {
    try {
      this.calculateFinalCost();
    } catch (error) {
      console.error('Error in BeforeInsert/BeforeUpdate blog:', error);
      throw error;
    }
  }

  calculateFinalCost() {
    this.final_cost = this.total_cost + this.tax - this.discount;
    this.final_cost = this.final_cost < 0 ? 0 : this.final_cost;
  }
}

@ObjectType()
export class GetOrderType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Order], { nullable: true })
  data?: Order[];
}
