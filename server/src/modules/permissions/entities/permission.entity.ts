import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MetadataResponse } from 'src/common/graphql/metadata.response';
import { Role } from 'src/modules/roles/entities/role.entity';
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

@ObjectType()
export class GetPermissionType {
  @Field(() => MetadataResponse, { nullable: true })
  metadata?: MetadataResponse;

  @Field(() => [Permission], { nullable: true })
  response?: Permission[];
}
