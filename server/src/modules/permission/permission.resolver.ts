import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { GetPermissionType, Permission } from './entities/permission.entity';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { CreatePermissionInput } from './dto/create-permission.dto';
import { AbstractResolver } from 'src/common/abstracts/resolver.abstract';
import { AppLogger } from 'src/common/logger/logger.service';

@Resolver(() => Permission)
export class PermissionResolver extends AbstractResolver<PermissionService> {
  constructor(
    private readonly permissionService: PermissionService,
    appLogger: AppLogger,
  ) {
    super(permissionService, appLogger);
  }

  @Query(() => Permission, { nullable: true })
  async permission(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<Permission>,
  ) {
    return await this.permissionService.getOne(condition);
  }

  @Query(() => GetPermissionType)
  async permissions(
    @Args({ name: 'query', nullable: true })
    query: GetManyInput<Permission>,
  ) {
    return await this.permissionService.getMany(query);
  }

  @Mutation(() => Permission)
  async createPermission(@Args('data') data: CreatePermissionInput) {
    return await this.permissionService.create(data);
  }

  @Mutation(() => Permission)
  async updatePermission(
    @Args('id') id: number,
    @Args('data') data: CreatePermissionInput,
  ) {
    return await this.permissionService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deletePermission(@Args('id') id: number) {
    return await this.permissionService.delete(id);
  }
}
