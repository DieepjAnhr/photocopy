import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class Role {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field((type) => [User], { defaultValue: [] })
  users?: User[];
}
