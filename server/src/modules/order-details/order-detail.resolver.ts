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
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailService } from './order-detail.service';
import { GetOrderType } from '../orders/entities/order.entity';
import { CreateOrderDetailInput } from './inputs/create-order-detail.input';
import { UpdateOrderDetailInput } from './inputs/update-order-detail.input';
import { UseInterceptors } from '@nestjs/common';
import { QueryOneInterceptor } from 'src/common/interceptors/query-one.interceptor';
import { QueryManyInterceptor } from 'src/common/interceptors/query-many.interceptor';

@Resolver(() => OrderDetail)
export class OrderDetailResolver extends AbstractResolver<OrderDetailService> {
  constructor(
    private readonly orderDetailService: OrderDetailService,
    appLogger: AppLogger,
  ) {
    super(orderDetailService, appLogger);
  }

  @Query(() => OrderDetail, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_FILE])
  @UseInterceptors(QueryOneInterceptor)
  async orderDetail(
    @Args({ name: 'query', nullable: true })
    condition: GetOneInput<OrderDetail>,
  ) {
    return await this.orderDetailService.getOne(condition);
  }

  @Query(() => GetOrderType)
  @UseAuthGuard([PERMISSIONS.VIEW_FILE])
  @UseInterceptors(QueryManyInterceptor)
  async orderDetails(
    @Args({ name: 'query', nullable: true })
    query: GetManyInput<OrderDetail>,
  ) {
    return await this.orderDetailService.getMany(query);
  }

  @Mutation(() => OrderDetail)
  @UseAuthGuard([PERMISSIONS.CREATE_FILE])
  async createOrderDetail(
    @Args('data') data: CreateOrderDetailInput,
    @CurrentUser() user: User,
  ) {
    return await this.orderDetailService.create(data, user);
  }

  @Mutation(() => OrderDetail)
  @UseAuthGuard([PERMISSIONS.UPDATE_FILE])
  async updateOrderDetail(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateOrderDetailInput,
    @CurrentUser() user: User,
  ) {
    return await this.orderDetailService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_FILE])
  async deleteOrderDetail(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.orderDetailService.delete(id, user);
  }

  @ResolveField(() => User, { nullable: true })
  async creator(
    @Parent() orderDetail: OrderDetail,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([orderDetail.created_by]);
    return users[0];
  }

  @ResolveField(() => User, { nullable: true })
  async updater(
    @Parent() orderDetail: OrderDetail,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([orderDetail.updated_by]);
    return users[0];
  }
}
