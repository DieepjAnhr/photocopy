import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import slugify from 'slugify';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';

@ObjectType({ description: 'file_upload' })
@Entity({ name: 'file_uploads' })
export class FileUpload extends AbstractEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field()
  @Column()
  slug: string;

  @Field()
  @Column()
  type: string;

  @Field(() => String)
  @Column()
  url: string;

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => ID)
  @Column()
  owner_by: number;

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
export class GetFileUploadType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [FileUpload], { nullable: true })
  data?: FileUpload[];
}
