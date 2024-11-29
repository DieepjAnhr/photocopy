import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BlogModule } from '../blog/blog.module';
import { BlogService } from '../blog/blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => BlogModule)],
  providers: [UserResolver, UserService, BlogService],
  exports: [TypeOrmModule]
})
export class UserModule { }
