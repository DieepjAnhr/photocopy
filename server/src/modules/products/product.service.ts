import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService extends AbstractService<
  Product,
  ProductRepository
> {
  constructor(
    private readonly productRepository: ProductRepository,
    appLogger: AppLogger,
  ) {
    super(productRepository, appLogger);
  }
}
