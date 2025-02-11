import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetUserType, User } from './entity/user.entity';
import { CreateUserInput } from './dto/create-user.dto';
import { UserService } from './user.service';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { Role } from '../role/entity/role.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  async user(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<User>,
  ) {
    if (typeof condition.where === 'string')
      condition.where = JSON.parse(condition.where);

    return await this.userService.getOne(condition);
  }

  @Query(() => GetUserType)
  async users(
    @Args({ name: 'query', nullable: true }) query: GetManyInput<User>,
  ) {
    if (typeof query.where === 'string') query.where = JSON.parse(query.where);

    return await this.userService.getMany(query);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput) {
    console.log(data);

    return await this.userService.create(data);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: CreateUserInput,
  ) {
    console.log(data);

    return await this.userService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number) {
    console.log(id);

    return await this.userService.delete(id);
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
