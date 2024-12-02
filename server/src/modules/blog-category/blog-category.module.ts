import { Module } from '@nestjs/common';
import { BlogCategoryResolver } from './blog-category.resolver';
import { BlogCategoryService } from './blog-category.service';

@Module({
  providers: [BlogCategoryResolver, BlogCategoryService]
})
export class BlogCategoryModule {}
