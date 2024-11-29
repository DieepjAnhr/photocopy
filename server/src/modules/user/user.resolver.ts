import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';
import { Role } from '../role/models/role.model';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly roleServie: RoleService,
  ) { }

  @Query(() => [User])
  users(): User[] {
    return this.userService.list();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number): User {
    return this.userService.detail(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('role_id', { type: () => Int }) role_id: number,
    @Args('name') name: string,
  ): User {
    return this.userService.create({ id, role_id, name });
  }

  @ResolveField()
  role(@Parent() user: User): Role {
    const roleId = user.role_id;
    return this.roleServie.detail(roleId);
  }
}
