import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST', 'localhost'),
  port: configService.get<number>('DATABASE_PORT', 5432),
  username: configService.get<string>('DATABASE_USER', 'admin'),
  password: configService.get<string>('DATABASE_PASSWORD', 'abcd1234!@#$'),
  database: configService.get<string>('DATABASE_NAME', 'photocopy'),
  schema: 'public',
  entities: ['dist/**/*.entity.js'],
  autoLoadEntities: true,
  dropSchema: false,
  synchronize: configService.get<string>('NODE_ENV') === 'development',
  logging: configService.get<boolean>('LOGGING', false),
});
