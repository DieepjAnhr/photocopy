import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import slugify from 'slugify';
import { Product } from 'src/modules/products/entities/product.entity';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';
import { Attribute } from 'src/modules/attributes/entities/attribute.entity';

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
  image_ids: number[];

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

  @Field(() => [ID])
  @Column('int', { array: true })
  attribute_ids: number[];

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToMany(() => Attribute, (attribute) => attribute.variants, {
    cascade: true,
  })
  @JoinTable({
    name: 'variant_attributes',
    joinColumn: {
      name: 'variant_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'attribute_id',
      referencedColumnName: 'id',
    },
  })
  attributes: Attribute[];

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
