import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Column, Entity } from 'typeorm';

@ObjectType()
// @Entity({ name: 'users' })
export class User {
  @Field(() => String)
  // @Column()
  username: string;

  @Field(() => String)
  // @Column()
  password: string;

  @Field(() => String, { nullable: true })
  // @Column()
  first_name?: string;

  @Field(() => String)
  // @Column()
  last_name: string;

  @Field(() => String)
  // @Column()
  phone: string;

  @Field(() => String)
  // @Column()
  email: string;

  @Field(() => String, { nullable: true })
  // @Column()
  avatar?: string;
}
