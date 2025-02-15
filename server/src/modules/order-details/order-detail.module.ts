import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailResolver } from './order-detail.resolver';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailRepository } from './order-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail]), LoggerModule],
  providers: [OrderDetailResolver, OrderDetailService, OrderDetailRepository],
  exports: [OrderDetailService],
})
export class OrderDetailModule {}
