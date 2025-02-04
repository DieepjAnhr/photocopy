import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GetCategoryType, Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import {
  GetManyInput,
  GetOneInput,
} from 'src/common/graphql/inputs/query.input';
import { User } from '../user/entities/user.entity';

const pubSub = new PubSub();

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category)
  @UseAuthGuard(['get_category'])
  async category(
    @Args('args', { nullable: true }) args: GetOneInput<Category>,
  ) {
    const category = await this.categoryService.getOne(args);
    if (!category) {
      throw new NotFoundException('Category not found!');
    }
    return category;
  }

  @Query(() => GetCategoryType)
  async categories(
    @Args('args', { nullable: true }) args: GetManyInput<Category>,
  ) {
    return this.categoryService.getByQuery(args);
  }

  @Mutation(() => Category)
  @UseAuthGuard(['create_category'])
  async createCategory(
    @Args('data') data: CreateCategoryInput,
    @CurrentUser() currentUser: User,
  ) {
    const category = await this.categoryService.create(data, currentUser);
    pubSub.publish('category_created', {
      data: category,
      performBy: currentUser,
    });
    return category;
  }

  @Mutation(() => Category)
  @UseAuthGuard(['update_category'])
  async updateCategory(
    @Args('id') id: number,
    @Args('data') data: UpdateCategoryInput,
    @CurrentUser() currentUser: User,
  ) {
    const user = await this.categoryService.update(id, data, currentUser);
    pubSub.publish('category_updated', { data: user, performBy: currentUser });
    return user;
  }

  @Mutation(() => Boolean)
  @UseAuthGuard(['delete_category'])
  async removeCategory(
    @Args('id') id: number,
    @CurrentUser() currentUser: User,
  ) {
    const remove = await this.categoryService.remove(id, currentUser);
    pubSub.publish('category_deleted', {
      data: { id },
      performBy: currentUser,
    });
    return remove;
  }

  @Subscription(() => Category)
  categoryCreated() {
    return pubSub.asyncIterableIterator('category_created');
  }

  @Subscription(() => Category)
  categoryUpdated() {
    return pubSub.asyncIterableIterator('category_updated');
  }

  @Subscription(() => Category)
  categoryRemoved() {
    return pubSub.asyncIterableIterator('category_removed');
  }

  // @ResolveField(() => [User])
  // creator(@Parent() category: Category) {
  //   return category.creator;
  // }
}
