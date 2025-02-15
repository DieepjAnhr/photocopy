import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import slugify from 'slugify';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Attribute } from 'src/modules/attributes/entities/attribute.entity';
import { Variant } from 'src/modules/variants/entities/variant.entity';

@ObjectType({ description: 'product' })
@Entity({ name: 'products' })
export class Product extends AbstractEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  slug: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  sku?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  code?: string;

  @Field(() => [ID])
  @Column('int', { array: true })
  category_ids: number[];

  @Field(() => [ID], { nullable: true })
  @Column('int', { array: true, nullable: true })
  images: string[];

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

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  like: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column()
  rate: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable({
    name: 'product_categories',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @ManyToMany(() => Attribute, (attribute) => attribute.products, {
    cascade: true,
  })
  @JoinTable({
    name: 'product_attributes',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'attribute_id',
      referencedColumnName: 'id',
    },
  })
  attributes: Attribute[];

  @ManyToMany(() => Variant, (variant) => variant.products, {
    cascade: true,
  })
  @JoinTable({
    name: 'product_variants',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'variant_id',
      referencedColumnName: 'id',
    },
  })
  variants: Variant[];

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsertOrUpdate() {
    try {
      this.slug = slugify(this.name, { trim: true, lower: true });
    } catch (error) {
      console.error('Error in BeforeInsert/BeforeUpdate blog:', error);
      throw error;
    }
  }
}

@ObjectType()
export class GetProductType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Product], { nullable: true })
  data?: Product[];
}
