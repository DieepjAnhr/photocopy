import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.dto';
import { UpdateBlogInput } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) { }

  async findAll() {
    return this.blogRepository.find();
  }

  async findOne(id: number) {
    return this.blogRepository.findOneBy({ id });
  }

  async create(createBlogInput: CreateBlogInput) {
    return this.blogRepository.save(createBlogInput);
  }

  async update(id: number, updateBlogInput: UpdateBlogInput) {
    await this.blogRepository.update(id, updateBlogInput);
    return this.blogRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    await this.blogRepository.delete(id);
    return blog;
  }
}
