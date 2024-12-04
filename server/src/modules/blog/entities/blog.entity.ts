import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractBaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'blogs' })
export class Blog extends AbstractBaseEntity {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  content: string;
}
