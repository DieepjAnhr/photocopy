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
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AbstractResolver } from 'src/common/abstracts/resolver.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { PERMISSIONS } from 'src/common/shared/constants/permission.constant';
import { Category, GetCategoryType } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './inputs/create-category.input';
import { User } from '../users/entities/user.entity';
import { UpdateCategoryInput } from './inputs/update-category.input';
import { UseInterceptors } from '@nestjs/common';
import { QueryOneInterceptor } from 'src/common/interceptors/query-one.interceptor';
import { QueryManyInterceptor } from 'src/common/interceptors/query-many.interceptor';

@Resolver(() => Category)
export class CategoryResolver extends AbstractResolver<CategoryService> {
  constructor(
    private readonly categoryService: CategoryService,
    appLogger: AppLogger,
  ) {
    super(categoryService, appLogger);
  }

  @Query(() => Category, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_CATEGORY])
  @UseInterceptors(QueryOneInterceptor)
  async category(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<Category>,
  ) {
    const category = await this.categoryService.getOne(condition);

    return category;
  }

  @Query(() => GetCategoryType)
  @UseAuthGuard([PERMISSIONS.VIEW_CATEGORY])
  @UseInterceptors(QueryManyInterceptor)
  async categories(
    @Args({ name: 'query', nullable: true }) query: GetManyInput<Category>,
  ) {
    const categories = await this.categoryService.getMany(query);

    return categories;
  }

  @Mutation(() => Category)
  @UseAuthGuard([PERMISSIONS.CREATE_CATEGORY])
  async createCategory(
    @Args('data') data: CreateCategoryInput,
    @CurrentUser() user: User,
  ) {
    return await this.categoryService.create(data, user);
  }

  @Mutation(() => Category)
  @UseAuthGuard([PERMISSIONS.UPDATE_CATEGORY])
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateCategoryInput,
    @CurrentUser() user: User,
  ) {
    return await this.categoryService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_CATEGORY])
  async deleteCategory(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.categoryService.delete(id, user);
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
