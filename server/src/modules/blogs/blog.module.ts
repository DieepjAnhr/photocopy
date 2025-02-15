import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Blog } from './entities/blog.entity';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), LoggerModule],
  providers: [BlogResolver, BlogService, BlogRepository],
  exports: [BlogService],
})
export class BlogModule {}
