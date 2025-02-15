import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstracts/repository.abstract';
import { Variant } from './entities/variant.entity';

@Injectable()
export class VariantRepository extends AbstractRepository<Variant> {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
  ) {
    super(variantRepository);
  }
}
