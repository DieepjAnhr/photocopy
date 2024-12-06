import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helpers/env.helper';
import { envValidation } from './common/helpers/env.validation';
import { SettingService } from './common/shared/settings/setting.service';
import { SettingModule } from './common/shared/settings/setting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(`${__dirname}/..`),
      validate: envValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SettingModule],
      inject: [SettingService],
      useFactory: (settingService: SettingService) =>
        settingService.typeOrmFactory,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [SettingModule],
      inject: [SettingService],
      useFactory: (settingService: SettingService) =>
        settingService.graphqlUseFactory,
    }),
  ],
})
export class AppModule { }
