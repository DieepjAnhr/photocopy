import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { Variant } from './entities/variant.entity';
import { VariantRepository } from './variant.repository';
import { AttributeService } from '../attributes/attribute.service';
import { DeepPartial } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { FileUploadService } from '../file-uploads/file-upload.service';

@Injectable()
export class VariantService extends AbstractService<
  Variant,
  VariantRepository
> {
  constructor(
    private readonly variantRepository: VariantRepository,
    private readonly attributeService: AttributeService,
    private readonly fileUploadService: FileUploadService,
    appLogger: AppLogger,
  ) {
    super(variantRepository, appLogger);
  }

  async create(data: DeepPartial<Variant>, createdBy?: User): Promise<Variant> {
    const createdById = createdBy?.id;
    this.logger.debug(
      `Create record by ${createdById} with arg: ${JSON.stringify(data)}`,
    );

    const [images, attributes] = await Promise.all([
      this.fileUploadService.getByIds(data.image_ids),
      this.attributeService.getByIds(data.attribute_ids),
    ]);

    const variant = await this.variantRepository.create({
      ...data,
      image_ids: images.map((elm) => elm.id),
      attribute_ids: attributes.map((elm) => elm.id),
      created_by: createdById,
      updated_by: createdById,
      images,
      attributes,
    });
    return variant;
  }

  async update(
    id: number,
    data: DeepPartial<Variant>,
    updatedBy?: User,
  ): Promise<Variant | null> {
    const updatedById = updatedBy?.id;
    this.logger.debug(
      `Update record by ${updatedById} with arg: ${JSON.stringify(data)}`,
    );
    const variant = await this.variantRepository.getOne({
      where: { id },
      relations: ['images', 'attributes'],
    });
    if (!variant) return null;

    const [images, attributes] = await Promise.all([
      data.image_ids
        ? this.fileUploadService.getByIds(data.image_ids)
        : Promise.resolve(variant.images),
      data.attribute_ids
        ? this.attributeService.getByIds(data.attribute_ids)
        : Promise.resolve(variant.attributes),
    ]);

    Object.assign(variant, data, {
      image_ids: variant.images.map((elm) => elm.id),
      attribute_ids: variant.attributes.map((elm) => elm.id),
      updated_by: updatedById,
      images,
      attributes,
    });

    return await this.variantRepository.save(variant);
  }

  async upsertByProduct(data: DeepPartial<Variant>, upsertBy: User) {
    if (!data.id) {
      return await this.create(data, upsertBy);
    }

    return await this.update(data.id, data, upsertBy);
  }
}
