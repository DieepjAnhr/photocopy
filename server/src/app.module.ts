import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/user/user.module';
import { BlogModule } from './modules/blog/blog.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helpers/env.helper';
import { envValidation } from './common/helpers/env.validation';
import { SettingService } from './common/shared/settings/setting.service';
import { SettingModule } from './common/shared/settings/setting.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from './modules/cache/cache.module';
import { ProductModule } from './modules/product/product.module';
import { ProductAttributeModule } from './modules/product-attribute/product-attribute.module';
import { ProductVariantModule } from './modules/product-variant/product-variant.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { OrderModule } from './modules/order/order.module';
import { OrderDetailModule } from './modules/order-detail/order-detail.module';
import { BlogCategoryModule } from './modules/blog-category/blog-category.module';
import { QueryFieldScalar } from './common/graphql/scalars/query.input';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(`${__dirname}/..`),
      validate: envValidation,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [SettingModule],
      inject: [SettingService],
      useFactory: (settingService: SettingService) =>
        settingService.graphqlUseFactory,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SettingModule],
      inject: [SettingService],
      useFactory: (settingService: SettingService) =>
        settingService.typeOrmFactory,
    }),
    AuthModule,
    CacheModule,
    UserModule,
    BlogModule,
    RoleModule,
    PermissionModule,
    ProductModule,
    ProductAttributeModule,
    ProductVariantModule,
    ProductCategoryModule,
    OrderModule,
    OrderDetailModule,
    BlogCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, QueryFieldScalar],
})
export class AppModule {}
