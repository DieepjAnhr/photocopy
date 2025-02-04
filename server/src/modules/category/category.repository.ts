import { AbstractRepository } from 'src/common/abstracts/repository.abstract';
import { Category } from './entities/category.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoryRepository extends AbstractRepository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
}
