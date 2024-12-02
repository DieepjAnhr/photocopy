import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from 'src/modules/role/entity/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'permissions' })
export class Permission {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  value: string;

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
