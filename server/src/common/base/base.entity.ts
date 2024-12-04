import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export abstract class AbstractBaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

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
