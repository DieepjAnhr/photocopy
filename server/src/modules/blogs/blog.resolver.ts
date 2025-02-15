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
import { GetBlogType, Blog } from './entities/blog.entity';
import { CreateBlogInput } from './inputs/create-blog.input';
import { BlogService } from './blog.service';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UpdateBlogInput } from './inputs/update-blog.input';
import { AbstractResolver } from 'src/common/abstracts/resolver.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { PERMISSIONS } from 'src/common/shared/constant/permission.constant';
import { User } from '../users/entities/user.entity';

@Resolver(() => Blog)
export class BlogResolver extends AbstractResolver<BlogService> {
  constructor(
    private readonly blogService: BlogService,
    appLogger: AppLogger,
  ) {
    super(blogService, appLogger);
  }

  @Query(() => Blog, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_BLOG])
  async blog(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<Blog>,
  ) {
    const user = await this.blogService.getOne(condition);

    return user;
  }

  @Query(() => GetBlogType)
  @UseAuthGuard([PERMISSIONS.VIEW_BLOG])
  async blogs(
    @Args({ name: 'query', nullable: true }) query: GetManyInput<Blog>,
  ) {
    const users = await this.blogService.getMany(query);

    return users;
  }

  @Mutation(() => Blog)
  @UseAuthGuard([PERMISSIONS.CREATE_BLOG])
  async createBlog(
    @Args('data') data: CreateBlogInput,
    @CurrentUser() user: User,
  ) {
    return await this.blogService.create(data, user);
  }

  @Mutation(() => Blog)
  @UseAuthGuard([PERMISSIONS.UPDATE_BLOG])
  async updateBlog(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateBlogInput,
    @CurrentUser() user: User,
  ) {
    return await this.blogService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_BLOG])
  async deleteBlog(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.blogService.delete(id, user);
  }

  @ResolveField(() => [Blog], { nullable: true })
  async categories(
    @Parent() blog: Blog,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const categories = await loaders.categoriesLoader.load(
      blog.category_ids || [],
    );
    return categories;
  }

  @ResolveField(() => User, { nullable: true })
  async creator(@Parent() blog: Blog, @Context() { loaders }: IGraphQLContext) {
    const users = await loaders.usersLoader.load([blog.created_by]);
    return users[0];
  }

  @ResolveField(() => User, { nullable: true })
  async updater(@Parent() blog: Blog, @Context() { loaders }: IGraphQLContext) {
    const users = await loaders.usersLoader.load([blog.updated_by]);
    return users[0];
  }
}
