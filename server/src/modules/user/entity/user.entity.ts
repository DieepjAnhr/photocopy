import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Role } from 'src/modules/role/entity/role.entity';

const BCRYPT_HASH_ROUNDS = 10;

@ObjectType({ description: 'user' })
@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Field(() => String)
  @Column()
  phone: string;

  @HideField()
  @Column()
  password: string;

  @Field(() => [ID], { nullable: true })
  @Column('int', { array: true, nullable: true })
  role_ids?: number[];

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  first_name?: string;

  @Field(() => String)
  @Column()
  last_name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'date', nullable: true })
  birthday?: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @HideField()
  @Column({ nullable: true })
  refresh_token?: string;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsertOrUpdate() {
    try {
      if (this.password && !this.password.startsWith('$2')) {
        this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUNDS);
      }

      if (!this.created_by) {
        this.created_by = this.id;
      }

      if (!this.updated_by) {
        this.updated_by = this.id;
      }
    } catch (error) {
      console.error('Error in BeforeInsert/BeforeUpdate user:', error);
      throw error;
    }
  }
}

@ObjectType()
export class GetUserType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [User], { nullable: true })
  data?: User[];
}
