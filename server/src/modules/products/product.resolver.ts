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

import { AbstractResolver } from 'src/common/abstracts/resolver.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { User } from '../users/entities/user.entity';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { PERMISSIONS } from 'src/common/shared/constant/permission.constant';
import { GetProductType, Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductInput } from './inputs/create-product.input';
import { Attribute } from '../attributes/entities/attribute.entity';
import { Variant } from '../variants/entities/variant.entity';
import { UpdateProductInput } from './inputs/update-product.input';

@Resolver(() => Product)
export class ProductResolver extends AbstractResolver<ProductService> {
  constructor(
    private readonly productService: ProductService,
    appLogger: AppLogger,
  ) {
    super(productService, appLogger);
  }

  @Query(() => Product, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_FILE])
  async product(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<Product>,
  ) {
    return await this.productService.getOne(condition);
  }

  @Query(() => GetProductType)
  @UseAuthGuard([PERMISSIONS.VIEW_FILE])
  async products(
    @Args({ name: 'query', nullable: true })
    query: GetManyInput<Product>,
  ) {
    return await this.productService.getMany(query);
  }

  @Mutation(() => Product)
  @UseAuthGuard([PERMISSIONS.CREATE_FILE])
  async createProduct(
    @Args('data') data: CreateProductInput,
    @CurrentUser() user: User,
  ) {
    return await this.productService.create(data, user);
  }

  @Mutation(() => Product)
  @UseAuthGuard([PERMISSIONS.UPDATE_FILE])
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateProductInput,
    @CurrentUser() user: User,
  ) {
    return await this.productService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_FILE])
  async deleteProduct(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.productService.delete(id, user);
  }

  @ResolveField(() => [Attribute], { nullable: true })
  async attributes(
    @Parent() product: Product,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const attributes = await loaders.attributesLoader.load(
      product.attribute_ids || [],
    );
    return attributes;
  }

  @ResolveField(() => [Variant], { nullable: true })
  async variants(
    @Parent() product: Product,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const attributes = await loaders.variantsLoader.load(
      product.variant_ids || [],
    );
    return attributes;
  }

  @ResolveField(() => User, { nullable: true })
  async creator(
    @Parent() product: Product,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([product.created_by]);
    return users[0];
  }

  @ResolveField(() => User, { nullable: true })
  async updater(
    @Parent() product: Product,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([product.updated_by]);
    return users[0];
  }
}
