import { Test, TestingModule } from '@nestjs/testing';
import { CacheResolver } from './cache.resolver';

describe('CacheResolver', () => {
  let resolver: CacheResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheResolver],
    }).compile();

    resolver = module.get<CacheResolver>(CacheResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
