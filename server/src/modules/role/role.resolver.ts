import { Args, Int, Mutation, Parent, Query, ResolveField } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './entity/role.entity';
import { CreateRoleInput } from './dto/create-role.dto';
import { UpdateRoleInput } from './dto/update-role.dto';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/entity/permission.entity';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService
  ) { }

  @Query(() => [Role])
  roles() {
    return this.roleService.findAll();
  }

  @Query(() => Role)
  role(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.findOne(id);
  }

  @Mutation(() => Role)
  createRole(@Args('create_data') createInput: CreateRoleInput) {
    return this.roleService.create(createInput);
  }

  @Mutation(() => Role)
  updateRole(@Args('update_data') updateInput: UpdateRoleInput) {
    return this.roleService.update(updateInput.id, updateInput);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.remove(id);
  }

  @ResolveField(() => [Permission])
  permissions(@Parent() role: Role) {
    return this.permissionService.getPermissionByRoleId(role.id)
  }
}
