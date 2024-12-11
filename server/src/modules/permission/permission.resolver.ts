import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Permission } from './entity/permission.entity';
import { PermissionService } from './permission.service';
import { PermissionArgs } from './dto/permission.args';
import { NotFoundException } from '@nestjs/common';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { CreatePermissionInput } from './dto/create-permission.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { PubSub } from 'graphql-subscriptions';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { User } from '../user/entities/user.entity';

const pubSub = new PubSub();

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => Permission)
  async permission(
    @Args('args', { nullable: true }) args: PermissionArgs,
  ): Promise<Permission> {
    const permission = await this.permissionService.getOne(args);
    if (!permission) {
      throw new NotFoundException('Permission not found!');
    }
    return permission;
  }

  @Query(() => [Permission])
  permissions(
    @Args('args', { nullable: true }) args: PermissionArgs,
  ): Promise<Permission[]> {
    return this.permissionService.getMany(args);
  }

  @Mutation(() => Permission)
  @UseAuthGuard(['create_permission'])
  async createPermission(
    @Args('data') data: CreatePermissionInput,
    @CurrentUser() currentUser: Permission,
  ): Promise<Permission> {
    const permission = await this.permissionService.create(data);
    pubSub.publish('permission_created', {
      data: permission,
      perfomer: currentUser,
    });
    return permission;
  }

  @Mutation(() => Permission)
  @UseAuthGuard(['update_permission'])
  async updatePermission(
    @Args('id') id: number,
    @Args('data') data: UpdatePermissionInput,
    @CurrentUser() currentUser: User,
  ): Promise<Permission> {
    const permission = await this.permissionService.update(id, data);
    pubSub.publish('permission_updated', {
      data: permission,
      perfomer: currentUser,
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
      perfomer: currentUser,
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
