import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBlogInput {
  @Field(() => String)
  title: string

  @Field(() => String)
  content: string

  @Field(() => ID)
  creator_id: number;
}
