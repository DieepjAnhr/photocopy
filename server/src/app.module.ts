import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './modules/users/user.module';
import { RoleModule } from './modules/roles/role.module';
import { DataloaderModule } from './common/dataloader/dataloader.module';
import { DataloaderService } from './common/dataloader/dataloader.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PermissionModule } from './modules/permissions/permission.module';
import { getEnvPath } from './common/helpers/env.helper';
import { envValidation } from './common/helpers/env.validation';
import { LoggerModule } from './common/logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blogs/blog.module';
import { CategoryModule } from './modules/categories/category.module';
import { ProductModule } from './modules/products/product.module';
import { OrderModule } from './modules/orders/order.module';
import { FileUploadModule } from './modules/file-uploads/file-upload.module';
import { OrderDetailModule } from './modules/order-details/order-detail.module';
import { AttributeModule } from './modules/attributes/attribute.module';
import { VariantModule } from './modules/variants/variant.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { typeOrmConfig } from './common/configs/typeorm.config';
import { graphqlConfig } from './common/configs/graphql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(`${__dirname}/..`),
      isGlobal: true,
      validate: envValidation,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      inject: [DataloaderService, ConfigService],
      useFactory: async (
        dataloaderService: DataloaderService,
        configService: ConfigService,
      ) => graphqlConfig(dataloaderService, configService),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    LoggerModule,
    AuthModule,
    BlogModule,
    CategoryModule,
    PermissionModule,
    RoleModule,
    UserModule,
    ProductModule,
    AttributeModule,
    VariantModule,
    OrderModule,
    FileUploadModule,
    OrderDetailModule,
    AppointmentModule,
  ],
})
export class AppModule {}
