import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  users(@Args('query') query: string) {
    return this.userService.getMany(query);
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('create_data') createData: string) {
    return this.userService.create(createData);
  }

  @Mutation(() => User)
  updateUser(@Args('update_data') updateData: string) {
    return this.userService.update(1, updateData);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  // @ResolveField(() => Role)
  // role(@Parent() user: User) {
  //   return user.role;
  // }
}
