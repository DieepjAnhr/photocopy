import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Column, Entity } from 'typeorm';

@ObjectType({ description: 'user' })
@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  first_name?: string;

  @Field(() => String)
  @Column()
  last_name: string;

  @Field(() => String)
  @Column()
  phone: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  birthday?: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  refresh_token?: string;
}
