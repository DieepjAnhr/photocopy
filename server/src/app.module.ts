import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JSONResolver } from 'graphql-scalars';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { DataloaderModule } from './common/dataloader/dataloader.module';
import { DataloaderService } from './common/dataloader/dataloader.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PermissionModule } from './modules/permission/permission.module';
import { getEnvPath } from './common/helpers/env.helper';
import { envValidation } from './common/helpers/env.validation';
import { GraphQLError } from 'graphql';
import { ERROR_CODES } from './common/exceptions/constant.exception';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(`${__dirname}/..`),
      validate: envValidation,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      inject: [DataloaderService],
      useFactory: async (dataloaderService: DataloaderService) => {
        return {
          resolvers: { JSON: JSONResolver },
          playground: false,
          sortSchema: true,
          autoSchemaFile: join(process.cwd(), `src/schema.gql`),
          context: () => ({
            loaders: dataloaderService.createLoaders(),
          }),
          formatError: (error: GraphQLError) => {
            return {
              status: error.extensions?.code || ERROR_CODES.UNKNOWN_ERROR,
              message: error.message,
              path: error.path || null,
              details: error.extensions?.details || null,
            };
          },
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'abcd1234!@#$',
        database: 'photocopy',
        schema: 'public',
        entities: ['dist/**/*.entity.js'],
        autoLoadEntities: true,
        dropSchema: false,
        synchronize: true,
        logging: true,
      }),
    }),
    LoggerModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
