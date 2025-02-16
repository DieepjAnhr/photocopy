import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Product } from 'src/modules/products/entities/product.entity';
import { Variant } from 'src/modules/variants/entities/variant.entity';
import { MetadataResponse } from 'src/common/graphql/metadata.response';

@ObjectType({ description: 'attribute' })
@Entity({ name: 'attributes' })
export class Attribute extends AbstractEntity {
  @Field(() => String)
  @Column()
  type: string;

  @Field()
  @Column()
  value: string;

  @ManyToMany(() => Product, (product) => product.attributes)
  products: Product[];

  @ManyToMany(() => Variant, (variant) => variant.attributes)
  variants: Variant[];
}

@ObjectType()
export class GetAttributeType {
  @Field(() => MetadataResponse, { nullable: true })
  metadata?: MetadataResponse;

  @Field(() => [Attribute], { nullable: true })
  data?: Attribute[];
}
