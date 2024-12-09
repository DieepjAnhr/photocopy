import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserArgs } from './dto/user.args';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('args', { nullable: true }) args: UserArgs): Promise<User> {
    const user = await this.userService.getOne(args);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Query(() => [User])
  users(@Args('args', { nullable: true }) args: UserArgs): Promise<User[]> {
    return this.userService.getMany(args);
  }

  @Mutation(() => User)
  @UseAuthGuard(['create_user'])
  async createUser(
    @Args('data') data: CreateUserInput,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    const user = await this.userService.create(data, currentUser);
    pubSub.publish('userCreated', { userCreated: user });
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
    pubSub.publish('userUpdated', { userUpdated: user });
    return user;
  }

  @Mutation(() => Boolean)
  @UseAuthGuard(['delete_user'])
  async removeUser(@Args('id') id: number, @CurrentUser() currentUser: User) {
    return this.userService.remove(id, currentUser);
  }

  @Subscription(() => User)
  userCreated() {
    return pubSub.asyncIterableIterator('userCreated');
  }

  @Subscription(() => User)
  userUpdated() {
    return pubSub.asyncIterableIterator('userUpdated');
  }
}
