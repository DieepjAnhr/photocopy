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
import { PERMISSIONS } from 'src/common/shared/constant/permission.constant';
import { User } from '../users/entities/user.entity';
import { Attribute, GetAttributeType } from './entities/attribute.entity';
import { AttributeService } from './attribute.service';
import { CreateAttributeInput } from './inputs/create-attribute.input';
import { UpdateAttributeInput } from './inputs/update-attribute.input';

@Resolver(() => Attribute)
export class AttributeResolver extends AbstractResolver<AttributeService> {
  constructor(
    private readonly attributeService: AttributeService,
    appLogger: AppLogger,
  ) {
    super(attributeService, appLogger);
  }

  @Query(() => Attribute, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_ATTRIBUTE])
  async attribute(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<Attribute>,
  ) {
    const attribute = await this.attributeService.getOne(condition);

    return attribute;
  }

  @Query(() => GetAttributeType)
  @UseAuthGuard([PERMISSIONS.VIEW_ATTRIBUTE])
  async attributes(
    @Args({ name: 'query', nullable: true }) query: GetManyInput<Attribute>,
  ) {
    const attributes = await this.attributeService.getMany(query);

    return attributes;
  }

  @Mutation(() => Attribute)
  @UseAuthGuard([PERMISSIONS.CREATE_ATTRIBUTE])
  async createAttribute(
    @Args('data') data: CreateAttributeInput,
    @CurrentUser() user: User,
  ) {
    return await this.attributeService.create(data, user);
  }

  @Mutation(() => Attribute)
  @UseAuthGuard([PERMISSIONS.UPDATE_ATTRIBUTE])
  async updateAttribute(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateAttributeInput,
    @CurrentUser() user: User,
  ) {
    return await this.attributeService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_ATTRIBUTE])
  async deleteAttribute(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.attributeService.delete(id, user);
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
