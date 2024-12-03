import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { IPagination } from "src/common/base/base.repository";
import { IsOptional } from "class-validator";


@InputType()
export class QueryUserInput {
    @Field(() => IPagination, { nullable: true, defaultValue: { page: 1, limit: 10 } })
    @IsOptional()
    pagination?: IPagination

    @Field(() => String, { nullable: true, defaultValue: 'all' })
    @IsOptional()
    queryType?: string
}

@ObjectType()
export class QueryUserOutput {
    @Field(() => Number, { nullable: true })
    count?: number

    @Field(() => [User], { nullable: true })
    data?: User[]
}