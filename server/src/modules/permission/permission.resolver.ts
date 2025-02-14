import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { GetPermissionType, Permission } from './entities/permission.entity';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { CreatePermissionInput } from './dto/create-permission.dto';
import { AbstractResolver } from 'src/common/abstracts/resolver.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { PERMISSIONS } from 'src/common/shared/constant/permission.constant';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from '../user/entity/user.entity';

@Resolver(() => Permission)
export class PermissionResolver extends AbstractResolver<PermissionService> {
  constructor(
    private readonly permissionService: PermissionService,
    appLogger: AppLogger,
  ) {
    super(permissionService, appLogger);
  }

  @Query(() => Permission, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_ROLE])
  async permission(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<Permission>,
  ) {
    return await this.permissionService.getOne(condition);
  }

  @Query(() => GetPermissionType)
  @UseAuthGuard([PERMISSIONS.VIEW_ROLE])
  async permissions(
    @Args({ name: 'query', nullable: true })
    query: GetManyInput<Permission>,
  ) {
    return await this.permissionService.getMany(query);
  }

  @Mutation(() => Permission)
  @UseAuthGuard([PERMISSIONS.FULL_ACCESS])
  async createPermission(
    @Args('data') data: CreatePermissionInput,
    @CurrentUser() user: User,
  ) {
    return await this.permissionService.create(data, user);
  }

  @Mutation(() => Permission)
  @UseAuthGuard([PERMISSIONS.FULL_ACCESS])
  async updatePermission(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: CreatePermissionInput,
    @CurrentUser() user: User,
  ) {
    return await this.permissionService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.FULL_ACCESS])
  async deletePermission(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.permissionService.delete(id, user);
  }
}
