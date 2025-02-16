import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Order } from './entities/order.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { OrderDetailModule } from '../order-details/order-detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    LoggerModule,
    forwardRef(() => OrderDetailModule),
  ],
  providers: [OrderResolver, OrderService, OrderRepository],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}
