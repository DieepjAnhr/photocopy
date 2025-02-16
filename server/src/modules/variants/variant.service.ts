import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { Variant } from './entities/variant.entity';
import { VariantRepository } from './variant.repository';
import { AttributeService } from '../attributes/attribute.service';
import { DeepPartial } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class VariantService extends AbstractService<
  Variant,
  VariantRepository
> {
  constructor(
    private readonly variantRepository: VariantRepository,
    private readonly attributeService: AttributeService,
    appLogger: AppLogger,
  ) {
    super(variantRepository, appLogger);
  }

  async create(data: DeepPartial<Variant>, createdBy?: User): Promise<Variant> {
    const createdById = createdBy?.id;
    this.logger.debug(
      `Create record by ${createdById} with arg: ${JSON.stringify(data)}`,
    );

    const attributes = await this.attributeService.getByIds(data.attribute_ids);

    const variant = await this.variantRepository.create({
      ...data,
      attribute_ids: attributes.map((elm) => elm.id),
      created_by: createdById,
      updated_by: createdById,
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
      relations: ['attributes'],
    });
    if (!variant) return null;

    if (data.attribute_ids) {
      variant.attributes = await this.attributeService.getByIds(
        data.attribute_ids,
      );
    }

    Object.assign(variant, data, {
      attribute_ids: variant.attributes.map((elm) => elm.id),
      updated_by: updatedById,
    });

    return this.variantRepository.save(variant);
  }
}
