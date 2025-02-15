import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstracts/repository.abstract';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailRepository extends AbstractRepository<OrderDetail> {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {
    super(orderDetailRepository);
  }
}
