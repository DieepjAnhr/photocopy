import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.dto';
import { UpdateBlogInput } from './dto/update-blog.dto';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Blog])
  blogs() {
    return this.blogService.findAll();
  }

  @Query(() => Blog)
  blog(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.findOne(id);
  }

  @Mutation(() => Blog)
  createBlog(@Args('create_data') createBlogInput: CreateBlogInput) {
    return this.blogService.create(createBlogInput);
  }

  @Mutation(() => Blog)
  updateBlog(@Args('update_data') updateBlogInput: UpdateBlogInput) {
    return this.blogService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation(() => Blog)
  removeBlog(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.remove(id);
  }
}
