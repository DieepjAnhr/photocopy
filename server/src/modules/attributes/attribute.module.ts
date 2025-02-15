import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Attribute } from './entities/attribute.entity';
import { AttributeResolver } from './attribute.resolver';
import { AttributeService } from './attribute.service';
import { AttributeRepository } from './attribute.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute]), LoggerModule],
  providers: [AttributeResolver, AttributeService, AttributeRepository],
  exports: [AttributeService],
})
export class AttributeModule {}
