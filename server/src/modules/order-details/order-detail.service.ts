import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailRepository } from './order-detail.repository';

@Injectable()
export class OrderDetailService extends AbstractService<
  OrderDetail,
  OrderDetailRepository
> {
  constructor(
    private readonly orderDetailRepository: OrderDetailRepository,
    appLogger: AppLogger,
  ) {
    super(orderDetailRepository, appLogger);
  }
}
