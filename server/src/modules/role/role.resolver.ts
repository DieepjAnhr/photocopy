import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
} from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './entity/role.entity';
import { CreateRoleInput } from './dto/create-role.dto';
import { UpdateRoleInput } from './dto/update-role.dto';
import { Permission } from '../permission/entity/permission.entity';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

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
    return this.roleService.getPermissionByRole(role.id);
  }
}
