import { Injectable } from '@nestjs/common';
import { RoleService } from 'src/modules/roles/role.service';
import { IDataloader } from '../shared/interfaces/dataloader.interface';
import DataLoader from 'dataloader';
import { PermissionService } from 'src/modules/permissions/permission.service';
import { UserService } from 'src/modules/users/user.service';
import { BlogService } from 'src/modules/blogs/blog.service';
import { CategoryService } from 'src/modules/categories/category.service';
import { FileUploadService } from 'src/modules/file-uploads/file-upload.service';
import { ProductService } from 'src/modules/products/product.service';
import { AttributeService } from 'src/modules/attributes/attribute.service';
import { VariantService } from 'src/modules/variants/variant.service';
import { OrderDetailService } from 'src/modules/order-details/order-detail.service';
import { OrderService } from 'src/modules/orders/order.service';
import { AppointmentService } from 'src/modules/appointment/appointment.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly appointmentsService: AppointmentService,
    private readonly attributeService: AttributeService,
    private readonly blogService: BlogService,
    private readonly categoryService: CategoryService,
    private readonly fileUploadService: FileUploadService,
    private readonly orderDetailService: OrderDetailService,
    private readonly orderService: OrderService,
    private readonly permissionService: PermissionService,
    private readonly productService: ProductService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly variantService: VariantService,
  ) {}

  private createLoader<T>(
    batchFn: (ids: number[]) => Promise<T[]>,
  ): DataLoader<number[], T[]> {
    return new DataLoader<number[], T[]>(async (keys) => {
      const allIds = Array.from(new Set(keys.flat()));
      const subjects = await batchFn(allIds);
      const subjectMap = Object.fromEntries(
        subjects.map((item: any) => [item.id, item]),
      );
      return keys.map((ids) => ids.map((id) => subjectMap[id]).filter(Boolean));
    });
  }

  createLoaders(): IDataloader {
    return {
      appointmentsLoader: this.createLoader((ids) =>
        this.appointmentsService.getByIds(ids),
      ),

      attributesLoader: this.createLoader((ids) =>
        this.attributeService.getByIds(ids),
      ),

      blogsLoader: this.createLoader((ids) => this.blogService.getByIds(ids)),

      categoriesLoader: this.createLoader((ids) =>
        this.categoryService.getByIds(ids),
      ),

      fileUploadsLoader: this.createLoader((ids) =>
        this.fileUploadService.getByIds(ids),
      ),

      orderDetailsLoader: this.createLoader((ids) =>
        this.orderDetailService.getByIds(ids),
      ),

      ordersLoader: this.createLoader((ids) => this.orderService.getByIds(ids)),

      permissionsLoader: this.createLoader((ids) =>
        this.permissionService.getByIds(ids),
      ),

      productsLoader: this.createLoader((ids) =>
        this.productService.getByIds(ids),
      ),

      rolesLoader: this.createLoader((ids) => this.roleService.getByIds(ids)),

      usersLoader: this.createLoader((ids) => this.userService.getByIds(ids)),

      variantsLoader: this.createLoader((ids) =>
        this.variantService.getByIds(ids),
      ),
    };
  }
}
