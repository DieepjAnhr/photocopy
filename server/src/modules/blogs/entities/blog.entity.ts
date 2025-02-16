import { Field, ID, ObjectType } from '@nestjs/graphql';
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

@ObjectType({ description: 'blog' })
@Entity({ name: 'blogs' })
export class Blog extends AbstractEntity {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  slug: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  short_description?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  meta_title?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  meta_description?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  meta_robots?: string;

  @Field(() => [ID], { nullable: true })
  @Column('int', { array: true, nullable: true })
  category_ids: number[];

  @ManyToMany(() => Category, (category) => category.blogs, { cascade: true })
  @JoinTable({
    name: 'blog_categories',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

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
export class GetBlogType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Blog], { nullable: true })
  data?: Blog[];
}
