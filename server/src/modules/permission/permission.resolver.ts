import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { GetPermissionType, Permission } from './entities/permission.entity';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { CreatePermissionInput } from './dto/create-permission.dto';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => Permission, { nullable: true })
  async permission(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<Permission>,
  ) {
    if (typeof condition.where === 'string')
      condition.where = JSON.parse(condition.where);

    return await this.permissionService.getOne(condition);
  }

  @Query(() => GetPermissionType)
  async permissions(
    @Args({ name: 'query', nullable: true })
    query: GetManyInput<Permission>,
  ) {
    if (typeof query.where === 'string') query.where = JSON.parse(query.where);

    return await this.permissionService.getMany(query);
  }

  @Mutation(() => Permission)
  async createPermission(@Args('data') data: CreatePermissionInput) {
    console.log(data);

    return await this.permissionService.create(data);
  }

  @Mutation(() => Permission)
  async updatePermission(
    @Args('id') id: number,
    @Args('data') data: CreatePermissionInput,
  ) {
    console.log(data);

    return await this.permissionService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deletePermission(@Args('id') id: number) {
    console.log(id);

    return await this.permissionService.delete(id);
  }
}
