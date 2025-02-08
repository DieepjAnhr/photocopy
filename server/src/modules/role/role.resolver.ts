import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetRoleType, Role } from './entity/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { RoleService } from './role.service';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { Permission } from '../permission/entities/permission.entity';
import { User } from '../user/entity/user.entity';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => Role)
  async role(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<Role>,
  ) {
    console.log(condition);

    return await this.roleService.getOne(1);
  }

  @Query(() => GetRoleType)
  async roles(
    @Args({ name: 'query', nullable: true }) condition: GetManyInput<Role>,
  ) {
    console.log(condition);

    return await this.roleService.getByBatch([]);
  }

  @Mutation(() => Role)
  async createRole(@Args('data') data: CreateRoleInput) {
    console.log(data);

    return await this.roleService.create(data);
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('id') id: number,
    @Args('data') data: CreateRoleInput,
  ) {
    console.log(data);

    return await this.roleService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteRole(@Args('id') id: number) {
    console.log(id);

    return await this.roleService.delete(id);
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
