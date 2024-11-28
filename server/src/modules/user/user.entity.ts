import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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
  @Column({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;
}

@ObjectType()
export class GetUserType {
  @Field(() => [User], { nullable: true })
  data?: User[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
