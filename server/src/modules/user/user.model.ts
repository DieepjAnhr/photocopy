import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    role_id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    avatar?: string;
}