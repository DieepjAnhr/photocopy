import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Column, Entity } from 'typeorm';

@ObjectType({ description: 'role' })
@Entity({ name: 'roles' })
export class Role extends AbstractEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  // @ManyToMany(() => User, (user) => user.roles)
  // users: User[];

  // @ManyToMany(() => Permission, (permission) => permission.roles, {
  //   eager: true,
  // })
  // @JoinTable({
  //   name: 'role_permissions',
  //   joinColumn: { name: 'role_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  // })
  // permissions: Permission[];
}

@ObjectType()
export class GetRoleType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Role], { nullable: true })
  data?: Role[];
}
