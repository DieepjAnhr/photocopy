import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Variant } from './entities/variant.entity';
import { VariantResolver } from './variant.resolver';
import { VariantService } from './variant.service';
import { VariantRepository } from './variant.repository';
import { AttributeModule } from '../attributes/attribute.module';
import { FileUploadModule } from '../file-uploads/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Variant]),
    LoggerModule,
    forwardRef(() => AttributeModule),
    forwardRef(() => FileUploadModule),
  ],
  providers: [VariantResolver, VariantService, VariantRepository],
  exports: [VariantService, VariantRepository],
})
export class VariantModule {}
