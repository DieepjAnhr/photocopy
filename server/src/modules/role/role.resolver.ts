import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Role } from './role.model';
import { RoleService } from './role.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Resolver(() => Role)
export class RoleResolver {
    constructor(
        private readonly roleService: RoleService,
        private readonly userService: UserService
    ) { }

    @Query(() => [Role])
    roleList(): Role[] {
        return this.roleService.list()
    }

    @Query(() => Role)
    roleDetail(@Args('id', { type: () => Int }) id: number): Role {
        return this.roleService.detail(id)
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
