import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
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
import { ECategoryType } from 'src/common/shared/enums/category.enum';
import { MetadataResponse } from 'src/common/graphql/metadata.response';

registerEnumType(ECategoryType, {
  name: 'ECategoryType',
  description: 'Enum for category types',
});

@ObjectType({ description: 'category' })
@Entity({ name: 'categories' })
export class Category extends AbstractEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  slug: string;

  @Field(() => ECategoryType)
  @Column({ type: 'enum', enum: ECategoryType })
  type: string;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  parent_id?: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [ID], { nullable: true })
  @Column('int', { array: true, nullable: true })
  children_ids?: number[];

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
  @Field(() => MetadataResponse, { nullable: true })
  metadata?: MetadataResponse;

  @Field(() => [Category], { nullable: true })
  data?: Category[];
}
