import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { Permission } from './entity/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.dto';
import { UpdatePermissionInput } from './dto/update-permission.dto';

@Resolver()
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => [Permission])
  permissions() {
    return this.permissionService.findAll();
  }

  @Query(() => Permission)
  permission(@Args('id', { type: () => Int }) id: number) {
    return this.permissionService.findOne(id);
  }

  @Mutation(() => Permission)
  createPermission(
    @Args('create_data') createBlogInput: CreatePermissionInput,
  ) {
    return this.permissionService.create(createBlogInput);
  }

  @Mutation(() => Permission)
  updatePermission(
    @Args('update_data') updateBlogInput: UpdatePermissionInput,
  ) {
    return this.permissionService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation(() => Permission)
  removePermission(@Args('id', { type: () => Int }) id: number) {
    return this.permissionService.remove(id);
  }
}
