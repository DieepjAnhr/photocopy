import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helpers/env.helper';
import { envValidation } from './common/helpers/env.validation';
import { SettingModule } from './common/shared/settings/setting.module';
import { SettingService } from './common/shared/settings/setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';

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
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
