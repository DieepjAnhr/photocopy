import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService extends AbstractService<Order, OrderRepository> {
  constructor(
    private readonly orderRepository: OrderRepository,
    appLogger: AppLogger,
  ) {
    super(orderRepository, appLogger);
  }
}
