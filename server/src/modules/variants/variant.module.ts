import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Variant } from './entities/variant.entity';
import { VariantResolver } from './variant.resolver';
import { VariantService } from './variant.service';
import { VariantRepository } from './variant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Variant]), LoggerModule],
  providers: [VariantResolver, VariantService, VariantRepository],
  exports: [VariantService],
})
export class VariantModule {}
