import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailResolver } from './order-detail.resolver';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailRepository } from './order-detail.repository';
import { OrderModule } from '../orders/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail]),
    LoggerModule,
    forwardRef(() => OrderModule),
  ],
  providers: [OrderDetailResolver, OrderDetailService, OrderDetailRepository],
  exports: [OrderDetailService, OrderDetailRepository],
})
export class OrderDetailModule {}
