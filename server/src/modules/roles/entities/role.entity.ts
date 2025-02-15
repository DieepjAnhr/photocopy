import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { User } from 'src/modules/users/entities/user.entity';
import { Permission } from 'src/modules/permissions/entities/permission.entity';

@ObjectType({ description: 'role' })
@Entity({ name: 'roles' })
export class Role extends AbstractEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [ID], { nullable: true })
  @Column('int', { array: true, nullable: true })
  permission_ids?: number[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    cascade: true,
  })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}

@ObjectType()
export class GetRoleType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Role], { nullable: true })
  data?: Role[];
}
