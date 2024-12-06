// import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
// import { IsNotEmpty, IsOptional } from 'class-validator';
// import { AbstractQueryInput } from 'src/common/abstracts/query-input.abstract';
// import { User } from '../entities/user.entity';

// @InputType()
// export class QueryUser extends PartialType(User) { }

// @InputType()
// export class QueryUserInput extends AbstractQueryInput {
//     @Field(() => QueryUser, { nullable: true })
//     @IsOptional()
//     filter?: QueryUser;
// }

// @InputType()
// export class CreateUserInput {
//     @Field(() => String)
//     @IsNotEmpty()
//     username: string;

//     @Field(() => String)
//     @IsNotEmpty()
//     password: string;

//     @Field(() => String, { nullable: true })
//     @IsOptional()
//     first_name?: string;

//     @Field(() => String)
//     @IsNotEmpty()
//     last_name: string;

//     @Field(() => String)
//     @IsNotEmpty()
//     phone: string;

//     @Field(() => String)
//     @IsNotEmpty()
//     email: string;

//     @Field(() => String, { nullable: true })
//     @IsOptional()
//     avatar?: string;
// }

// @InputType()
// export class UpdateUserInput extends PartialType(CreateUserInput) {
//     @Field(() => ID)
//     @IsNotEmpty()
//     id: number;
// }
