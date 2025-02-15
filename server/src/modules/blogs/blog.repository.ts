import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { AbstractRepository } from 'src/common/abstracts/repository.abstract';

@Injectable()
export class BlogRepository extends AbstractRepository<Blog> {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
  ) {
    super(blogRepository);
  }
}
