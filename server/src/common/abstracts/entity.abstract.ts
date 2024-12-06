import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export abstract class AbstractEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  creator_id?: number;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  updater_id?: number;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  deleter_id?: number;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ nullable: true })
  delete_at: Date;
}
