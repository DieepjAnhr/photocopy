import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { StringUtil } from 'src/common/utils/string.util';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

@ObjectType({ description: 'category' })
@Entity({ name: 'categories' })
export class Category extends AbstractEntity {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  slug: string;

  @Field(() => String, { nullable: true })
  @Column()
  content: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsertOrUpdate() {
    try {
      this.slug = new StringUtil(this.title).generateSlug().getValue();
    } catch (error) {
      console.error('Error in BeforeInsert/BeforeUpdate category:', error);
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
