import { Module } from '@nestjs/common';
import { OrderDetailResolver } from './order-detail.resolver';
import { OrderDetailService } from './order-detail.service';

@Module({
  providers: [OrderDetailResolver, OrderDetailService],
})
export class OrderDetailModule {}
