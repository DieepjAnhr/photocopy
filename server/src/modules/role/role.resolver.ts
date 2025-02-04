import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GetRoleType, Role } from './entities/role.entity';
import { RoleService } from './role.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import {
  GetManyInput,
  GetOneInput,
} from 'src/common/graphql/inputs/query.input';
import { User } from '../user/entities/user.entity';

const pubSub = new PubSub();

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => Role)
  @UseAuthGuard(['get_role'])
  async role(@Args('args', { nullable: true }) args: GetOneInput<Role>) {
    const role = await this.roleService.getOne(args);
    if (!role) {
      throw new NotFoundException('Role not found!');
    }
    return role;
  }

  @Query(() => GetRoleType)
  async roles(@Args('args', { nullable: true }) args: GetManyInput<Role>) {
    return this.roleService.getByQuery(args);
  }

  @Mutation(() => Role)
  @UseAuthGuard(['create_role'])
  async createRole(
    @Args('data') data: CreateRoleInput,
    @CurrentUser() currentUser: User,
  ) {
    const role = await this.roleService.create(data, currentUser);
    pubSub.publish('role_created', { data: role, performBy: currentUser });
    return role;
  }

  @Mutation(() => Role)
  @UseAuthGuard(['update_role'])
  async updateRole(
    @Args('id') id: number,
    @Args('data') data: UpdateRoleInput,
    @CurrentUser() currentUser: User,
  ) {
    const user = await this.roleService.update(id, data, currentUser);
    pubSub.publish('role_updated', { data: user, performBy: currentUser });
    return user;
  }

  @Mutation(() => Boolean)
  @UseAuthGuard(['delete_role'])
  async removeRole(@Args('id') id: number, @CurrentUser() currentUser: User) {
    const remove = await this.roleService.remove(id, currentUser);
    pubSub.publish('role_deleted', { data: { id }, performBy: currentUser });
    return remove;
  }

  @Subscription(() => Role)
  roleCreated() {
    return pubSub.asyncIterableIterator('role_created');
  }

  @Subscription(() => Role)
  roleUpdated() {
    return pubSub.asyncIterableIterator('role_updated');
  }

  @Subscription(() => Role)
  roleRemoved() {
    return pubSub.asyncIterableIterator('role_removed');
  }

  // @ResolveField(() => [Permission])
  // permissions(@Parent() role: Role) {
  //   return role.permissions;
  // }
}
