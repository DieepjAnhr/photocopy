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
import { PERMISSIONS } from 'src/common/shared/constants/permission.constant';
import { GetVariantType, Variant } from './entities/variant.entity';
import { VariantService } from './variant.service';
import { CreateVariantInput } from './inputs/create-variant.input';
import { UpdateVariantInput } from './inputs/update-variant.input';
import { FileUpload } from '../file-uploads/entities/file-upload.entity';
import { UseInterceptors } from '@nestjs/common';
import { QueryOneInterceptor } from 'src/common/interceptors/query-one.interceptor';
import { QueryManyInterceptor } from 'src/common/interceptors/query-many.interceptor';

@Resolver(() => Variant)
export class VariantResolver extends AbstractResolver<VariantService> {
  constructor(
    private readonly variantService: VariantService,
    appLogger: AppLogger,
  ) {
    super(variantService, appLogger);
  }

  @Query(() => Variant, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_VARIANT])
  @UseInterceptors(QueryOneInterceptor)
  async variant(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<Variant>,
  ) {
    return await this.variantService.getOne(condition);
  }

  @Query(() => GetVariantType)
  @UseAuthGuard([PERMISSIONS.VIEW_VARIANT])
  @UseInterceptors(QueryManyInterceptor)
  async variants(
    @Args({ name: 'query', nullable: true })
    query: GetManyInput<Variant>,
  ) {
    return await this.variantService.getMany(query);
  }

  @Mutation(() => Variant)
  @UseAuthGuard([PERMISSIONS.CREATE_VARIANT])
  async createVariant(
    @Args('data') data: CreateVariantInput,
    @CurrentUser() user: User,
  ) {
    return await this.variantService.create(data, user);
  }

  @Mutation(() => Variant)
  @UseAuthGuard([PERMISSIONS.UPDATE_VARIANT])
  async updateVariant(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateVariantInput,
    @CurrentUser() user: User,
  ) {
    return await this.variantService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_VARIANT])
  async deleteVariant(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.variantService.delete(id, user);
  }

  @ResolveField(() => [FileUpload], { nullable: true })
  async images(
    @Parent() variant: Variant,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const images = await loaders.fileUploadsLoader.load(
      variant.image_ids || [],
    );
    return images;
  }

  @ResolveField(() => User, { nullable: true })
  async creator(
    @Parent() variant: Variant,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([variant.created_by]);
    return users[0];
  }

  @ResolveField(() => User, { nullable: true })
  async updater(
    @Parent() variant: Variant,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([variant.updated_by]);
    return users[0];
  }
}
