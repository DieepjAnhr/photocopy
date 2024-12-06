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
  @Column()
  creator_id?: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Field(() => ID, { nullable: true })
  @Column()
  updater_id?: number;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Field(() => ID, { nullable: true })
  @Column()
  deleter_id?: number;

  @Field(() => Date)
  @DeleteDateColumn({ type: 'timestamp' })
  delete_at: Date;
}
