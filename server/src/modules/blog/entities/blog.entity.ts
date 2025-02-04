import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { StringUtil } from 'src/common/utils/string.util';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

@ObjectType({ description: 'blog' })
@Entity({ name: 'blogs' })
export class Blog extends AbstractEntity {
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
