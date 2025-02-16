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
import { FileUploadService } from '../file-uploads/file-upload.service';
import { Variant } from '../variants/entities/variant.entity';

@Injectable()
export class ProductService extends AbstractService<
  Product,
  ProductRepository
> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly fileUploadService: FileUploadService,
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

    const [images, attachments, categories, attributes, variants] =
      await Promise.all([
        this.fileUploadService.getByIds(data.image_ids),
        this.fileUploadService.getByIds(data.attachment_ids),
        this.categoryService.getByIds(data.category_ids),
        this.attributeService.getByIds(data.attribute_ids),
        Promise.all(
          data.variants.map((variant: Variant) =>
            this.variantService.create(variant),
          ),
        ),
      ]);

    const product = await this.productRepository.create({
      ...data,
      image_ids: images.map((elm) => elm.id),
      attachment_ids: attachments.map((elm) => elm.id),
      category_ids: categories.map((elm) => elm.id),
      attribute_ids: attributes.map((elm) => elm.id),
      variant_ids: variants.map((elm) => elm.id),
      created_by: createdById,
      updated_by: createdById,
      images,
      attachments,
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
    this.logger.debug(`Updating product ${id} by ${updatedById}`);

    const product = await this.productRepository.getOne({
      where: { id },
      relations: [
        'images',
        'attachments',
        'categories',
        'attributes',
        'variants',
      ],
    });

    if (!product) return null;

    const [images, attachments, attributes, categories, variants] =
      await Promise.all([
        data.image_ids
          ? this.fileUploadService.getByIds(data.image_ids)
          : Promise.resolve(product.images),
        data.attachment_ids
          ? this.fileUploadService.getByIds(data.attachment_ids)
          : Promise.resolve(product.attachments),
        data.attribute_ids
          ? this.attributeService.getByIds(data.attribute_ids)
          : Promise.resolve(product.attributes),
        data.category_ids
          ? this.categoryService.getByIds(data.category_ids)
          : Promise.resolve(product.categories),
        data.variants
          ? Promise.all(
              data.variants.map((variant: Variant) =>
                this.variantService.upsertByProduct(variant, updatedBy),
              ),
            )
          : Promise.resolve(product.variants),
      ]);

    Object.assign(product, data, {
      image_id: images.map((elm) => elm.id),
      attachment_ids: attachments.map((elm) => elm.id),
      attribute_ids: attributes.map((elm) => elm.id),
      category_ids: categories.map((elm) => elm.id),
      variant_ids: variants.map((elm) => elm.id),
      updated_by: updatedById,
      images,
      attachments,
      attributes,
      categories,
      variants,
    });

    return this.productRepository.save(product);
  }
}
