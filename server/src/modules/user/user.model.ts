import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  role_id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  avatar?: string;
}

@ObjectType()
export class GetUserType {
  @Field(() => [User], { nullable: true })
  data?: User[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
