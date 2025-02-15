import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import slugify from 'slugify';
import { Product } from 'src/modules/products/entities/product.entity';

@ObjectType({ description: 'variant' })
@Entity({ name: 'variants' })
export class Variant extends AbstractEntity {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
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

  @Field(() => String)
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

  @ManyToMany(() => Product, (product) => product.variants)
  products: Product[];

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
