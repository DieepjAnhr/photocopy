import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { LoggerModule } from 'src/common/logger/logger.module';
import { ProductRepository } from './product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), LoggerModule],
  providers: [ProductResolver, ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
