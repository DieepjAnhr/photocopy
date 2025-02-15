import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { Variant } from './entities/variant.entity';
import { VariantRepository } from './variant.repository';

@Injectable()
export class VariantService extends AbstractService<
  Variant,
  VariantRepository
> {
  constructor(
    private readonly variantRepository: VariantRepository,
    appLogger: AppLogger,
  ) {
    super(variantRepository, appLogger);
  }
}
