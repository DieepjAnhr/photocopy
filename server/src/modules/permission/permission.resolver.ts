import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GetPermissionType, Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';
import { NotFoundException } from '@nestjs/common';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { CreatePermissionInput } from './dto/create-permission.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { PubSub } from 'graphql-subscriptions';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { User } from '../user/entities/user.entity';
import {
  GetManyInput,
  GetOneInput,
} from 'src/common/graphql/inputs/query.input';

const pubSub = new PubSub();

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => Permission)
  async permission(
    @Args('args', { nullable: true }) args: GetOneInput<Permission>,
  ) {
    const permission = await this.permissionService.getOne(args);
    if (!permission) {
      throw new NotFoundException('Permission not found!');
    }
    return permission;
  }

  @Query(() => GetPermissionType)
  permissions(
    @Args('args', { nullable: true }) args: GetManyInput<Permission>,
  ) {
    return this.permissionService.getByQuery(args);
  }

  @Mutation(() => Permission)
  @UseAuthGuard(['create_permission'])
  async createPermission(
    @Args('data') data: CreatePermissionInput,
    @CurrentUser() currentUser: Permission,
  ) {
    const permission = await this.permissionService.create(data);
    pubSub.publish('permission_created', {
      data: permission,
      performBy: currentUser,
    });
    return permission;
  }

  @Mutation(() => Permission)
  @UseAuthGuard(['update_permission'])
  async updatePermission(
    @Args('id') id: number,
    @Args('data') data: UpdatePermissionInput,
    @CurrentUser() currentUser: User,
  ) {
    const permission = await this.permissionService.update(id, data);
    pubSub.publish('permission_updated', {
      data: permission,
      performBy: currentUser,
    });
    return permission;
  }

  @Mutation(() => Boolean)
  @UseAuthGuard(['delete_permission'])
  async removePermission(
    @Args('id') id: number,
    @CurrentUser() currentUser: User,
  ) {
    const remove = this.permissionService.remove(id);
    pubSub.publish('permission_removed', {
      data: { id },
      performBy: currentUser,
    });
    return remove;
  }

  @Subscription(() => Permission)
  permissionCreated() {
    return pubSub.asyncIterableIterator('permission_created');
  }

  @Subscription(() => Permission)
  permissionUpdated() {
    return pubSub.asyncIterableIterator('permission_updated');
  }

  @Subscription(() => Permission)
  permissionRemoved() {
    return pubSub.asyncIterableIterator('permission_removed');
  }
}
