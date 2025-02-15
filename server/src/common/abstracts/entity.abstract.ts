import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export abstract class AbstractEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  created_by?: number;

  @Field(() => Number, { nullable: true })
  @CreateDateColumn()
  created_at?: number;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  updated_by?: number;

  @Field(() => Number, { nullable: true })
  @UpdateDateColumn()
  updated_at?: number;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  deleted_by?: number;

  @Field(() => Number, { nullable: true })
  @DeleteDateColumn()
  deleted_at?: number;
}
