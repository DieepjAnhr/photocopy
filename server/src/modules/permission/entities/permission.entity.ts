import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

@ObjectType()
export class GetPermissionType {
  @Field(() => Number, { nullable: true })
  count: number;

  @Field(() => [Permission], { nullable: true })
  data: Permission[];
}
