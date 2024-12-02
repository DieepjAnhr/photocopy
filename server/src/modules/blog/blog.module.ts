import { forwardRef, Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), forwardRef(() => UserModule)],
  providers: [BlogResolver, BlogService, UserService],
  exports: [TypeOrmModule],
})
export class BlogModule {}
