import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstracts/repository.abstract';
import { FileUpload } from './entities/file-upload.entity';

@Injectable()
export class FileUploadRepository extends AbstractRepository<FileUpload> {
  constructor(
    @InjectRepository(FileUpload)
    private readonly fileUploadRepository: Repository<FileUpload>,
  ) {
    super(fileUploadRepository);
  }
}
