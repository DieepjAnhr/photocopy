import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GetUserType, User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import {
  GetManyInput,
  GetOneInput,
} from 'src/common/graphql/inputs/query.input';
// import { Role } from '../role/entities/role.entity';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('args', { nullable: true }) args: GetOneInput<User>) {
    const user = await this.userService.getOne(args);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Query(() => GetUserType)
  async users(@Args('args', { nullable: true }) args: GetManyInput<User>) {
    return this.userService.getByQuery(args);
  }

  @Mutation(() => User)
  @UseAuthGuard(['create_user'])
  async createUser(
    @Args('data') data: CreateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    const user = await this.userService.create(data, currentUser);
    pubSub.publish('user_created', { data: user, performBy: currentUser });
    return user;
  }

  @Mutation(() => User)
  @UseAuthGuard(['update_user'])
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    const user = await this.userService.update(id, data, currentUser);
    pubSub.publish('user_updated', { data: user, performBy: currentUser });
    return user;
  }

  @Mutation(() => Boolean)
  @UseAuthGuard(['delete_user'])
  async removeUser(@Args('id') id: number, @CurrentUser() currentUser: User) {
    const remove = await this.userService.remove(id, currentUser);
    pubSub.publish('user_deleted', { data: { id }, performBy: currentUser });
    return remove;
  }

  @Subscription(() => User)
  userCreated() {
    return pubSub.asyncIterableIterator('user_created');
  }

  @Subscription(() => User)
  userUpdated() {
    return pubSub.asyncIterableIterator('user_updated');
  }

  @Subscription(() => User)
  userRemoved() {
    return pubSub.asyncIterableIterator('user_removed');
  }

  // @ResolveField(() => Role)
  // roles(@Parent() user: User, @Context() { loaders }: IGraphQLContext) {
  //   console.log(loaders);
  //   return loaders.roleLoader.loadMany([1, 2, 3]);
  // }

  // @ResolveField(() => [Role])
  // roles(@Parent() user: User) {
  //   return user.roles;
  // }
}
