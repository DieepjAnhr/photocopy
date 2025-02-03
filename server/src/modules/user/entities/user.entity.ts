import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Role } from 'src/modules/role/entities/role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

const BCRYPT_HASH_ROUNDS = 10;

@ObjectType({ description: 'user' })
@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  first_name?: string;

  @Field(() => String)
  @Column()
  last_name: string;

  @Field(() => String)
  @Column()
  phone: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  birthday?: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  refresh_token?: string;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsertOrUpdate() {
    try {
      if (this.password && !this.password.startsWith('$2')) {
        this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUNDS);
      }
    } catch (error) {
      console.error('Error in BeforeInsert/BeforeUpdate user:', error);
      throw error;
    }
  }
}
