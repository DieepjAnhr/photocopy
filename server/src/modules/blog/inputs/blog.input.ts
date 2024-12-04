import { Field, ID, InputType, PartialType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Blog } from '../entities/blog.entity';

@InputType()
export class QueryBlogInput extends Blog {
    @Field(() => String)
    @IsNotEmpty()
    title: string;

    @Field(() => String)
    @IsNotEmpty()
    content: string;
}

@InputType()
export class CreateBlogInput extends OmitType(Blog, ['id', 'creator_id', 'created_at', 'updater_id', 'updated_at'] as const) {
    @Field(() => String)
    @IsNotEmpty()
    title: string;

    @Field(() => String)
    @IsNotEmpty()
    content: string;
}

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
    @Field(() => ID)
    @IsNotEmpty()
    id: number;
}
