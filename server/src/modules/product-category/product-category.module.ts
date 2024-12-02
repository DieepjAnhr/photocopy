import { Module } from '@nestjs/common';
import { ProductCategoryResolver } from './product-category.resolver';
import { ProductCategoryService } from './product-category.service';

@Module({
  providers: [ProductCategoryResolver, ProductCategoryService]
})
export class ProductCategoryModule {}
