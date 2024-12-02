import { Test, TestingModule } from '@nestjs/testing';
import { BlogCategoryResolver } from './blog-category.resolver';

describe('BlogCategoryResolver', () => {
  let resolver: BlogCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogCategoryResolver],
    }).compile();

    resolver = module.get<BlogCategoryResolver>(BlogCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
