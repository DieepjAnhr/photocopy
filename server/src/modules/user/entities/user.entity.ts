import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column()
  role_id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column()
  email?: string;

  @Field({ nullable: true })
  @Column()
  avatar?: string;
}
