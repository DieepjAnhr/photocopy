import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { DeepPartial } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AttributeService } from '../attributes/attribute.service';
import { CategoryService } from '../categories/category.service';
import { VariantService } from '../variants/variant.service';

@Injectable()
export class ProductService extends AbstractService<
  Product,
  ProductRepository
> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly attributeService: AttributeService,
    private readonly categoryService: CategoryService,
    private readonly variantService: VariantService,
    appLogger: AppLogger,
  ) {
    super(productRepository, appLogger);
  }

  async create(data: DeepPartial<Product>, createdBy?: User): Promise<Product> {
    const createdById = createdBy?.id;
    this.logger.debug(
      `Create record by ${createdById} with arg: ${JSON.stringify(data)}`,
    );

    const categories = await this.categoryService.getByIds(data.category_ids);

    const attributes = await this.attributeService.getByIds(data.attribute_ids);

    const variants = await this.variantService.getByIds(data.variant_ids);

    const product = await this.productRepository.create({
      ...data,
      category_ids: categories.map((elm) => elm.id),
      attribute_ids: attributes.map((elm) => elm.id),
      variant_ids: variants.map((elm) => elm.id),
      created_by: createdById,
      updated_by: createdById,
      categories,
      attributes,
      variants,
    });
    return product;
  }

  async update(
    id: number,
    data: DeepPartial<Product>,
    updatedBy?: User,
  ): Promise<Product | null> {
    const updatedById = updatedBy?.id;
    this.logger.debug(
      `Update record by ${updatedById} with arg: ${JSON.stringify(data)}`,
    );
    const product = await this.productRepository.getOne({
      where: { id },
      relations: ['categories', 'attributes', 'variants'],
    });
    if (!product) return null;

    if (data.attribute_ids) {
      product.attributes = await this.attributeService.getByIds(
        data.attribute_ids,
      );
    }

    if (data.category_ids) {
      product.categories = await this.categoryService.getByIds(
        data.category_ids,
      );
    }

    if (data.variant_ids) {
      product.variants = await this.variantService.getByIds(data.variant_ids);
    }

    Object.assign(product, data, {
      attribute_ids: product.attributes.map((elm) => elm.id),
      category_ids: product.categories.map((elm) => elm.id),
      variant_ids: product.variants.map((elm) => elm.id),
      updated_by: updatedById,
    });

    return this.productRepository.save(product);
  }
}
