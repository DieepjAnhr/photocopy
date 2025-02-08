import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';

@ObjectType({ description: 'role' })
@Entity({ name: 'roles' })
export class Role extends AbstractEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [ID], { nullable: true })
  @Column('int', { array: true, nullable: true })
  permission_ids?: number[];

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;
}

@ObjectType()
export class GetRoleType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Role], { nullable: true })
  data?: Role[];
}
