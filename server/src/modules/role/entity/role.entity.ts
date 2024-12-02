import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Permission } from 'src/modules/permission/entity/permission.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'roles' })
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => ID)
  @Column()
  creator_id: number;

  @Field(() => ID)
  @Column()
  updater_id: number;

  @Field(() => [Permission])
  @ManyToMany(() => Permission, (permission) => permission.roles, { cascade: true })
  @JoinTable({
    name: 'role_permissions', // Custom table name
    joinColumn: {
      name: 'role_id', // Column name in the join table referring to Role
      referencedColumnName: 'id', // Column in the Role entity
    },
    inverseJoinColumn: {
      name: 'permission_id', // Column name in the join table referring to Permission
      referencedColumnName: 'id', // Column in the Permission entity
    },
  })
  permissions: Permission[];
}
