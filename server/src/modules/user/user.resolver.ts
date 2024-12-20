import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Role } from '../role/entity/role.entity';
import { GetManyInput, GetOneInput } from 'src/common/graphql/inputs/get-many.input';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => User)
  async user(@Args('args', { nullable: true }) args: GetOneInput<User>): Promise<User> {
    const user = await this.userService.getOne(args);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Query(() => [User])
  users(@Args('args', { nullable: true }) args: GetManyInput<User>): Promise<User[]> {
    return this.userService.getMany(args);
  }

  @Mutation(() => User)
  @UseAuthGuard(['create_user'])
  async createUser(
    @Args('data') data: CreateUserInput,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    const user = await this.userService.create(data, currentUser);
    pubSub.publish('user_created', { data: user, performer: currentUser });
    return user;
  }

  @Mutation(() => User)
  @UseAuthGuard(['update_user'])
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    const user = await this.userService.update(id, data, currentUser);
    pubSub.publish('user_updated', { data: user, performer: currentUser });
    return user;
  }

  @Mutation(() => Boolean)
  @UseAuthGuard(['delete_user'])
  async removeUser(@Args('id') id: number, @CurrentUser() currentUser: User) {
    const remove = await this.userService.remove(id, currentUser);
    pubSub.publish('user_updated', { data: { id }, performer: currentUser });
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

  @ResolveField(() => Role)
  roles(@Parent() user: User) {
    return user.roles;
  }
}
