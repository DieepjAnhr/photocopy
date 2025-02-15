import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService extends AbstractService<
  Category,
  CategoryRepository
> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    appLogger: AppLogger,
  ) {
    super(categoryRepository, appLogger);
  }
}
