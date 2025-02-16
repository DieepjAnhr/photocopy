import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { DeepPartial } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { OrderDetailService } from '../order-details/order-detail.service';
import { OrderDetail } from '../order-details/entities/order-detail.entity';

@Injectable()
export class OrderService extends AbstractService<Order, OrderRepository> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderDetailService: OrderDetailService,
    appLogger: AppLogger,
  ) {
    super(orderRepository, appLogger);
  }

  async create(data: DeepPartial<Order>, createdBy?: User): Promise<Order> {
    const createdById = createdBy?.id;
    this.logger.debug(
      `Create record by ${createdById} with arg: ${JSON.stringify(data)}`,
    );

    const orderDetails: OrderDetail[] = await Promise.all(
      data.order_details.map((elm: OrderDetail) =>
        this.orderDetailService.create(elm, createdBy),
      ),
    );

    const user = await this.orderRepository.create({
      ...data,
      order_detail_ids: orderDetails.map((elm) => elm.id),
      created_by: createdById,
      updated_by: createdById,
      order_details: orderDetails,
    });
    return user;
  }

  async update(
    id: number,
    data: DeepPartial<Order>,
    updatedBy?: User,
  ): Promise<Order | null> {
    const updatedById = updatedBy?.id;
    this.logger.debug(
      `Update record by ${updatedById} with arg: ${JSON.stringify(data)}`,
    );
    const order = await this.orderRepository.getOne({
      where: { id },
      relations: ['order_details'],
    });
    if (!order) return null;

    Object.assign(order, data, { updated_by: updatedById });

    return this.orderRepository.save(order);
  }
}
