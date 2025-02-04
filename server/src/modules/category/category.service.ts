import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { User } from '../user/entities/user.entity';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoryRepository } from './category.repository';
import {
  GetManyInput,
  GetOneInput,
} from 'src/common/graphql/inputs/query.input';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getOne(args: GetOneInput<Category>) {
    const category = await this.categoryRepository.getOne(args);
    return category;
  }

  async getByQuery(args: GetManyInput<Category>) {
    return await this.categoryRepository.getByQuery(args);
  }

  async create(data: CreateCategoryInput, performBy?: User) {
    const category = this.categoryRepository.create({
      ...data,
      created_by: performBy?.id,
      updated_by: performBy?.id,
    });
    return await this.categoryRepository.save(category);
  }

  async update(id: number, data: UpdateCategoryInput, performBy?: User) {
    const category = await this.categoryRepository.preload({
      id,
      ...data,
      updated_by: performBy?.id,
    });
    if (!category) throw new NotFoundException('Category not found!');
    return await this.categoryRepository.save(category);
  }

  async remove(id: number, performBy?: User) {
    await this.categoryRepository.update({ id }, { deleted_by: performBy?.id });
    await this.categoryRepository.softDelete({ id });
    return true;
  }
}
