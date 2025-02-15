import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { FileUpload } from './entities/file-upload.entity';
import { FileUploadRepository } from './file-upload.repository';
import { AppLogger } from 'src/common/logger/logger.service';

@Injectable()
export class FileUploadService extends AbstractService<
  FileUpload,
  FileUploadRepository
> {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    appLogger: AppLogger,
  ) {
    super(fileUploadRepository, appLogger);
  }
}
