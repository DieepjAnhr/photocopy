import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { RoleModule } from 'src/modules/roles/role.module';
import { PermissionModule } from 'src/modules/permissions/permission.module';
import { UserModule } from 'src/modules/users/user.module';
import { BlogModule } from 'src/modules/blogs/blog.module';
import { CategoryModule } from 'src/modules/categories/category.module';
import { AttributeModule } from 'src/modules/attributes/attribute.module';
import { FileUploadModule } from 'src/modules/file-uploads/file-upload.module';
import { ProductModule } from 'src/modules/products/product.module';
import { VariantModule } from 'src/modules/variants/variant.module';
import { OrderDetailModule } from 'src/modules/order-details/order-detail.module';
import { OrderModule } from 'src/modules/orders/order.module';
import { AppointmentModule } from 'src/modules/appointment/appointment.module';

@Module({
  imports: [
    AppointmentModule,
    AttributeModule,
    BlogModule,
    CategoryModule,
    FileUploadModule,
    OrderDetailModule,
    OrderModule,
    PermissionModule,
    ProductModule,
    RoleModule,
    UserModule,
    VariantModule,
  ],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
