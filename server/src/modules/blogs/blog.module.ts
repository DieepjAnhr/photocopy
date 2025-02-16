import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Blog } from './entities/blog.entity';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';
import { CategoryModule } from '../categories/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    LoggerModule,
    forwardRef(() => CategoryModule),
  ],
  providers: [BlogResolver, BlogService, BlogRepository],
  exports: [BlogService, BlogRepository],
})
export class BlogModule {}
