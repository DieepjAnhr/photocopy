import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetRoleType, Role } from './entities/role.entity';
import { CreateRoleInput } from './inputs/create-role.input';
import { RoleService } from './role.service';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { Permission } from '../permissions/entities/permission.entity';
import { User } from '../users/entities/user.entity';
import { AppLogger } from 'src/common/logger/logger.service';
import { AbstractResolver } from 'src/common/abstracts/resolver.abstract';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { PERMISSIONS } from 'src/common/shared/constant/permission.constant';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Resolver(() => Role)
export class RoleResolver extends AbstractResolver<RoleService> {
  constructor(
    private readonly roleService: RoleService,
    appLogger: AppLogger,
  ) {
    super(roleService, appLogger);
  }

  @Query(() => Role, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_ROLE])
  async role(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<Role>,
  ) {
    const role = await this.roleService.getOne(condition);

    return role;
  }

  @Query(() => GetRoleType)
  @UseAuthGuard([PERMISSIONS.VIEW_ROLE])
  async roles(
    @Args({ name: 'query', nullable: true }) query: GetManyInput<Role>,
  ) {
    return await this.roleService.getMany(query);
  }

  @Mutation(() => Role)
  @UseAuthGuard([PERMISSIONS.CREATE_ROLE])
  async createRole(
    @Args('data') data: CreateRoleInput,
    @CurrentUser() user: User,
  ) {
    return await this.roleService.create(data, user);
  }

  @Mutation(() => Role)
  @UseAuthGuard([PERMISSIONS.UPDATE_ROLE])
  async updateRole(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: CreateRoleInput,
    @CurrentUser() user: User,
  ) {
    return await this.roleService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_ROLE])
  async deleteRole(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.roleService.delete(id, user);
  }

  @ResolveField(() => [Permission], { nullable: true })
  async permissions(
    @Parent() role: Role,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const permissions = await loaders.permissionsLoader.load(
      role.permission_ids || [],
    );

    return permissions;
  }

  @ResolveField(() => User, { nullable: true })
  async creator(@Parent() user: User, @Context() { loaders }: IGraphQLContext) {
    const users = await loaders.usersLoader.load([user.created_by]);
    return users[0];
  }

  @ResolveField(() => User, { nullable: true })
  async updater(@Parent() user: User, @Context() { loaders }: IGraphQLContext) {
    const users = await loaders.usersLoader.load([user.updated_by]);
    return users[0];
  }
}
