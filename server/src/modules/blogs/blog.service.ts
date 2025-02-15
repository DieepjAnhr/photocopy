import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { Blog } from './entities/blog.entity';
import { AppLogger } from 'src/common/logger/logger.service';
import { DeepPartial } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BlogService extends AbstractService<Blog, BlogRepository> {
  constructor(
    private readonly blogRepository: BlogRepository,
    appLogger: AppLogger,
  ) {
    super(blogRepository, appLogger);
  }

  async create(data: DeepPartial<Blog>, createdBy?: User): Promise<Blog> {
    const createdById = createdBy?.id;
    this.logger.debug(
      `Create record by ${createdById} with arg: ${JSON.stringify(data)}`,
    );
    const blog = await this.blogRepository.create({
      ...data,
      created_by: createdById,
      updated_by: createdById,
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
    });
    if (!blog) return null;

    Object.assign(blog, data, { updated_by: updatedById });

    return this.blogRepository.save(blog);
  }
}
