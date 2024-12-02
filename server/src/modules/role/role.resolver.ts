import { Args, Int, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './entity/role.entity';
import { CreateRoleInput } from './dto/create-role.dto';
import { UpdateRoleInput } from './dto/update-role.dto';

@Resolver()
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
  createRole(@Args('create_data') createBlogInput: CreateRoleInput) {
    return this.roleService.create(createBlogInput);
  }

  @Mutation(() => Role)
  updateRole(@Args('update_data') updateBlogInput: UpdateRoleInput) {
    return this.roleService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.remove(id);
  }
}
