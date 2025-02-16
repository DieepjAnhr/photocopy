import { Module } from '@nestjs/common';

import { FileUploadService } from './file-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUpload } from './entities/file-upload.entity';
import { LoggerModule } from 'src/common/logger/logger.module';
import { FileUploadResolver } from './file-upload.resolver';
import { FileUploadRepository } from './file-upload.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileUpload]), LoggerModule],
  providers: [FileUploadResolver, FileUploadService, FileUploadRepository],
  exports: [FileUploadService, FileUploadRepository],
})
export class FileUploadModule {}
