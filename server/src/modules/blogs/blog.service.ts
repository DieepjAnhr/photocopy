import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { Blog } from './entities/blog.entity';
import { AppLogger } from 'src/common/logger/logger.service';
import { CategoryService } from '../categories/category.service';
import { DeepPartial } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BlogService extends AbstractService<Blog, BlogRepository> {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly categoryService: CategoryService,
    appLogger: AppLogger,
  ) {
    super(blogRepository, appLogger);
  }

  async create(data: DeepPartial<Blog>, createdBy?: User): Promise<Blog> {
    const createdById = createdBy?.id;
    this.logger.debug(
      `Create record by ${createdById} with arg: ${JSON.stringify(data)}`,
    );

    const categories = await this.categoryService.getByIds(data.category_ids);

    const blog = await this.blogRepository.create({
      ...data,
      category_ids: categories.map((elm) => elm.id),
      created_by: createdById,
      updated_by: createdById,
      categories,
    });
    return blog;
  }

  async update(
    id: number,
    data: DeepPartial<Blog>,
    updatedBy?: User,
  ): Promise<Blog | null> {
    const updatedById = updatedBy?.id;
    this.logger.debug(
      `Update record by ${updatedById} with arg: ${JSON.stringify(data)}`,
    );
    const blog = await this.blogRepository.getOne({
      where: { id },
      relations: ['categories'],
    });
    if (!blog) return null;

    if (data.category_ids) {
      blog.categories = await this.categoryService.getByIds(data.category_ids);
    }

    Object.assign(blog, data, {
      category_ids: blog.categories.map((elm) => elm.id),
      updated_by: updatedById,
    });

    return this.blogRepository.save(blog);
  }
}
