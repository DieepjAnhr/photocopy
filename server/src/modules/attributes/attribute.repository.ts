import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstracts/repository.abstract';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributeRepository extends AbstractRepository<Attribute> {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {
    super(attributeRepository);
  }
}
