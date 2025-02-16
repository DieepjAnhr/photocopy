import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MetadataResponse {
  @Field(() => Number, { nullable: true })
  total_item?: number;

  @Field(() => Number, { nullable: true })
  total_page?: number;

  @Field(() => Number, { nullable: true })
  current_page?: number;

  @Field(() => Number, { nullable: true })
  page_size?: number;
}
