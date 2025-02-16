import { forwardRef, Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { LoggerModule } from 'src/common/logger/logger.module';
import { ProductRepository } from './product.repository';
import { Attribute } from '../attributes/entities/attribute.entity';
import { Variant } from '../variants/entities/variant.entity';
import { Category } from '../categories/entities/category.entity';
import { AttributeModule } from '../attributes/attribute.module';
import { CategoryModule } from '../categories/category.module';
import { VariantModule } from '../variants/variant.module';
import { FileUploadModule } from '../file-uploads/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Attribute, Category, Variant]),
    LoggerModule,
    forwardRef(() => AttributeModule),
    forwardRef(() => CategoryModule),
    forwardRef(() => VariantModule),
    forwardRef(() => FileUploadModule),
  ],
  providers: [ProductResolver, ProductService, ProductRepository],
  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
