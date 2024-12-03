import { Module } from '@nestjs/common';
import { ProductVariantResolver } from './product-variant.resolver';
import { ProductVariantService } from './product-variant.service';

@Module({
  providers: [ProductVariantResolver, ProductVariantService],
})
export class ProductVariantModule {}
