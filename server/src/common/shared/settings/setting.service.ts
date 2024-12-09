import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UtilService } from '../services/util.service';
import { join } from 'path';
import { ApolloDriverConfig } from '@nestjs/apollo';

@Injectable()
export class SettingService {
  constructor(private readonly utilService: UtilService) { }

  get graphqlUseFactory():
    | Omit<ApolloDriverConfig, 'driver'>
    | (Promise<Omit<ApolloDriverConfig, 'driver'>> & { uploads: boolean }) {
    return {
      uploads: false,
      autoSchemaFile: join(
        process.cwd(),
        `${this.utilService.nodeEnv === 'test' ? 'test' : 'src'}/schema.gql`,
      ),
      sortSchema: true,
    };
  }

  get typeOrmFactory(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const isTestEnv = this.utilService.nodeEnv === 'test';
    return {
      type: 'postgres',
      host: this.utilService.getString('DB_HOST'),
      port: this.utilService.getNumber('DB_PORT'),
      username: this.utilService.getString('DB_USER'),
      password: this.utilService.getString('DB_PASSWORD'),
      database: this.utilService.getString('DB_NAME'),
      schema: this.utilService.getString('DB_SCHEMA'),
      entities: isTestEnv
        ? [join(process.cwd(), 'src', '**', '*.entity.{ts,js}')]
        : ['dist/**/*.entity.js'],
      migrations: [
        join(
          process.cwd(),
          `${isTestEnv ? 'src' : 'dist'}/migrations/*.{ts,js}`,
        ),
      ],
      synchronize: this.utilService.nodeEnv !== 'production',
      autoLoadEntities: true,
      dropSchema: isTestEnv,
      logging: true,
    };
  }
}
