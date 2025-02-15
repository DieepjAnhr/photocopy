import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import slugify from 'slugify';
import { Product } from 'src/modules/products/entities/product.entity';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';

@ObjectType({ description: 'variant' })
@Entity({ name: 'variants' })
export class Variant extends AbstractEntity {
  @Field(() => ID)
  @Column()
  product_id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column()
  slug: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  sku?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  code?: string;

  @Field(() => [ID], { nullable: true })
  @Column('int', { array: true, nullable: true })
  images: number[];

  @Field(() => String, { nullable: true })
  @Column()
  status: string;

  @Field(() => Int)
  @Column()
  regular_price: number;

  @Field(() => Int)
  @Column()
  sale_price: number;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.variant)
  order_details: OrderDetail[];

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsertOrUpdate() {
    try {
      this.slug = slugify(this.title, { trim: true, lower: true });
    } catch (error) {
      console.error('Error in BeforeInsert/BeforeUpdate blog:', error);
      throw error;
    }
  }
}

@ObjectType()
export class GetVariantType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Variant], { nullable: true })
  data?: Variant[];
}
