import { Module } from '@nestjs/common';
import { CacheResolver } from './cache.resolver';
import { CacheService } from './cache.service';

@Module({
  providers: [CacheResolver, CacheService]
})
export class CacheModule {}
