import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserArgs } from './dto/user.args';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    const user = await this.userService.getOne(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [User])
  users(@Args('args') args: UserArgs): Promise<User[]> {
    return this.userService.getMany(args);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.create(data);
    pubSub.publish('userCreated', { userCreated: user });
    return user;
  }

  @Mutation(() => User)
  async updateUser(@Args('data') data: UpdateUserInput): Promise<User> {
    const user = await this.userService.update(data.id, data);
    pubSub.publish('userUpdated', { userUpdated: user });
    return user;
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
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
