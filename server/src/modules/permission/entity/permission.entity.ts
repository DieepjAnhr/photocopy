import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/modules/role/entity/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'permission' })
@Entity({ name: 'permissions' })
export class Permission {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  label: string;

  @Field(() => String)
  @Column()
  value: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
