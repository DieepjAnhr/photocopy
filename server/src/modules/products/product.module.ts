import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { LoggerModule } from 'src/common/logger/logger.module';
import { ProductRepository } from './product.repository';
import { Attribute } from '../attributes/entities/attribute.entity';
import { Variant } from '../variants/entities/variant.entity';
import { AttributeService } from '../attributes/attribute.service';
import { VariantService } from '../variants/variant.service';
import { Category } from '../categories/entities/category.entity';
import { CategoryService } from '../categories/category.service';
import { AttributeRepository } from '../attributes/attribute.repository';
import { CategoryRepository } from '../categories/category.repository';
import { VariantRepository } from '../variants/variant.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Attribute, Category, Variant]),
    LoggerModule,
  ],
  providers: [
    ProductResolver,
    ProductService,
    ProductRepository,
    AttributeService,
    AttributeRepository,
    CategoryService,
    CategoryRepository,
    VariantService,
    VariantRepository,
  ],
  exports: [ProductService],
})
export class ProductModule {}
