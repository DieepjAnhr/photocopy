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

import { GetOrderType, Order } from '../orders/entities/order.entity';
import { OrderService } from './order.service';
import { CreateOrderInput } from './inputs/create-order.input';
import { UpdateOrderInput } from './inputs/update-order.input';

@Resolver(() => Order)
export class OrderResolver extends AbstractResolver<OrderService> {
  constructor(
    private readonly orderService: OrderService,
    appLogger: AppLogger,
  ) {
    super(orderService, appLogger);
  }

  @Query(() => Order, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_ORDER])
  async order(
    @Args({ name: 'query', nullable: true })
    condition: GetOneInput<Order>,
  ) {
    return await this.orderService.getOne(condition);
  }

  @Query(() => GetOrderType)
  @UseAuthGuard([PERMISSIONS.VIEW_ORDER])
  async orders(
    @Args({ name: 'query', nullable: true })
    query: GetManyInput<Order>,
  ) {
    return await this.orderService.getMany(query);
  }

  @Mutation(() => Order)
  @UseAuthGuard([PERMISSIONS.CREATE_ORDER])
  async createOrder(
    @Args('data') data: CreateOrderInput,
    @CurrentUser() user: User,
  ) {
    return await this.orderService.create(data, user);
  }

  @Mutation(() => Order)
  @UseAuthGuard([PERMISSIONS.UPDATE_ORDER])
  async updateOrder(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateOrderInput,
    @CurrentUser() user: User,
  ) {
    return await this.orderService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_ORDER])
  async deleteOrder(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.orderService.delete(id, user);
  }

  @ResolveField(() => User, { nullable: true })
  async creator(
    @Parent() order: Order,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([order.created_by]);
    return users[0];
  }

  @ResolveField(() => User, { nullable: true })
  async updater(
    @Parent() order: Order,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([order.updated_by]);
    return users[0];
  }
}
