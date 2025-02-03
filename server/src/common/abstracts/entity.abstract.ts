import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export abstract class AbstractEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  created_by?: number;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  updated_by?: number;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  deleted_by?: number;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
