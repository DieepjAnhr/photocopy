import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Blog } from 'src/modules/blog/entities/blog.entity';
import { Role } from 'src/modules/role/entity/role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column()
  role_id: number;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => String)
  @Column()
  first_name: string;

  @Field(() => String)
  @Column()
  last_name: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column()
  avatar?: string;

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

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @BeforeInsert()
  setRegisterId() {
    if (!this.creator_id) this.creator_id = this.id;
    if (!this.updater_id) this.updater_id = this.id;
  }
}
