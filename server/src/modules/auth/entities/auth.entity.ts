import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class TokenWithUser {
  @Field(() => String)
  access_token: string;

  @Field(() => User)
  user: User;
}
