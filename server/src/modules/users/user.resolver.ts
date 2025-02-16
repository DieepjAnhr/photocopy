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
import { GetUserType, User } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UserService } from './user.service';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { Role } from '../roles/entities/role.entity';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UpdateUserInput } from './inputs/update-user.input';
import { AbstractResolver } from 'src/common/abstracts/resolver.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { PERMISSIONS } from 'src/common/shared/constants/permission.constant';
import { UseInterceptors } from '@nestjs/common';
import { QueryManyInterceptor } from 'src/common/interceptors/query-many.interceptor';
import { QueryOneInterceptor } from 'src/common/interceptors/query-one.interceptor';

@Resolver(() => User)
export class UserResolver extends AbstractResolver<UserService> {
  constructor(
    private readonly userService: UserService,
    appLogger: AppLogger,
  ) {
    super(userService, appLogger);
  }

  @Query(() => User, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_USER])
  @UseInterceptors(QueryOneInterceptor)
  async user(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<User>,
  ) {
    const user = await this.userService.getOne(condition);

    return user;
  }

  @Query(() => GetUserType)
  @UseAuthGuard([PERMISSIONS.VIEW_USER])
  @UseInterceptors(QueryManyInterceptor)
  async users(
    @Args({ name: 'query', nullable: true }) query: GetManyInput<User>,
  ) {
    const users = await this.userService.getMany(query);

    return users;
  }

  @Mutation(() => User)
  @UseAuthGuard([PERMISSIONS.CREATE_USER])
  async createUser(
    @Args('data') data: CreateUserInput,
    @CurrentUser() user: User,
  ) {
    return await this.userService.create(data, user);
  }

  @Mutation(() => User)
  @UseAuthGuard([PERMISSIONS.UPDATE_USER])
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    return await this.userService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_USER])
  async deleteUser(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.userService.delete(id, user);
  }

  @ResolveField(() => [Role], { nullable: true })
  async roles(@Parent() user: User, @Context() { loaders }: IGraphQLContext) {
    const roles = await loaders.rolesLoader.load(user.role_ids || []);
    return roles;
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
