import { Module } from '@nestjs/common';
import { ProductAttributeResolver } from './product-attribute.resolver';
import { ProductAttributeService } from './product-attribute.service';

@Module({
  providers: [ProductAttributeResolver, ProductAttributeService]
})
export class ProductAttributeModule {}
