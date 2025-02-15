import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Product } from 'src/modules/products/entities/product.entity';

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
}

@ObjectType()
export class GetAttributeType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Attribute], { nullable: true })
  data?: Attribute[];
}
