import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { BlogService } from '../blog/blog.service';
import { Blog } from '../blog/entities/blog.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly blogService: BlogService
  ) { }

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('create_data') createBlogInput: CreateUserInput) {
    return this.userService.create(createBlogInput);
  }

  @Mutation(() => User)
  updateUser(@Args('update_data') updateBlogInput: UpdateUserInput) {
    return this.userService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @ResolveField(() => [Blog])
  blogs(@Parent() user: User) {
    const userId = user.id;
    return this.blogService.findAll();
  }
}
