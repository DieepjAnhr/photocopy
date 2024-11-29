import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

@ObjectType()
export class Role {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field((type) => [User], { defaultValue: [] })
  users?: User[];
}
