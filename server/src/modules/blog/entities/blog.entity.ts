import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'blogs' })
export class Blog {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => ID)
  @Column()
  creator_id: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Field(() => ID)
  @Column()
  updater_id: number;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
