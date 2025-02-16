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
import {
  EFileStatus,
  EFileType,
} from 'src/common/shared/enums/file-upload.enum';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Variant } from 'src/modules/variants/entities/variant.entity';
import { MetadataResponse } from 'src/common/graphql/metadata.response';

registerEnumType(EFileStatus, {
  name: 'EFileStatus',
  description: 'Enum for file upload status',
});

registerEnumType(EFileType, {
  name: 'EFileType',
  description: 'Enum for file upload type',
});

@ObjectType({ description: 'file_upload' })
@Entity({ name: 'file_uploads' })
export class FileUpload extends AbstractEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  slug: string;

  @Field(() => String)
  @Column()
  url: string;

  @Field(() => EFileType)
  @Column({ type: 'enum', enum: EFileType })
  type: string;

  @Field(() => EFileStatus)
  @Column({ type: 'enum', enum: EFileStatus })
  status: string;

  @Field(() => ID)
  @Column()
  owner_by: number;

  @ManyToMany(() => Appointment, (appointment) => appointment.attachments)
  appointment_attachments: Appointment[];

  @ManyToMany(() => Product, (product) => product.images)
  product_images: Product[];

  @ManyToMany(() => Product, (product) => product.attachments)
  product_attachments: Product[];

  @ManyToMany(() => Variant, (product) => product.images)
  variant_images: Variant[];

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
  @Field(() => MetadataResponse, { nullable: true })
  metadata?: MetadataResponse;

  @Field(() => [FileUpload], { nullable: true })
  data?: FileUpload[];
}
