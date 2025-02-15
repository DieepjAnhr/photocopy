import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import slugify from 'slugify';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Blog } from 'src/modules/blogs/entities/blog.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@ObjectType({ description: 'category' })
@Entity({ name: 'categories' })
export class Category extends AbstractEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field()
  @Column()
  slug: string;

  @Field(() => [ID], { nullable: true })
  @Column('int', { array: true, nullable: true })
  children_ids?: number[];

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  parent_id?: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Blog, (blog) => blog.categories)
  blogs: Blog[];

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

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
export class GetCategoryType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Category], { nullable: true })
  data?: Category[];
}
