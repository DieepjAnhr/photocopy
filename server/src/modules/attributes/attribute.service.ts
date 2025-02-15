import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { AttributeRepository } from './attribute.repository';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributeService extends AbstractService<
  Attribute,
  AttributeRepository
> {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    appLogger: AppLogger,
  ) {
    super(attributeRepository, appLogger);
  }
}
