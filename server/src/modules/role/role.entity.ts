import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => [User], { defaultValue: [] })
  users?: User[];
}
