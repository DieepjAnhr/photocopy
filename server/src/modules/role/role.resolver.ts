import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Role } from './models/role.model';
import { RoleService } from './role.service';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.model';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) { }

  @Query(() => [Role])
  roles(): Role[] {
    return this.roleService.list();
  }

  @Query(() => Role)
  role(@Args('id', { type: () => Int }) id: number): Role {
    return this.roleService.detail(id);
  }

  @Mutation(() => Role)
  createRole(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
  ): Role {
    return this.roleService.create({ id, name });
  }

  @ResolveField()
  users(@Parent() role: Role): User[] {
    const roleId = role.id;
    return this.userService.listByRoleId(roleId);
  }
}