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

@Injectable()
export class DataloaderService {
  constructor(
    private readonly attributeService: AttributeService,
    private readonly blogService: BlogService,
    private readonly categoryService: CategoryService,
    private readonly fileUploadService: FileUploadService,
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
      attributesLoader: this.createLoader((ids) =>
        this.attributeService.getDataloader(ids),
      ),

      blogsLoader: this.createLoader((ids) =>
        this.blogService.getDataloader(ids),
      ),

      categoriesLoader: this.createLoader((ids) =>
        this.categoryService.getDataloader(ids),
      ),

      fileUploadLoader: this.createLoader((ids) =>
        this.fileUploadService.getDataloader(ids),
      ),

      permissionsLoader: this.createLoader((ids) =>
        this.permissionService.getDataloader(ids),
      ),

      productLoader: this.createLoader((ids) =>
        this.productService.getDataloader(ids),
      ),

      rolesLoader: this.createLoader((ids) =>
        this.roleService.getDataloader(ids),
      ),

      usersLoader: this.createLoader((ids) =>
        this.userService.getDataloader(ids),
      ),

      variantsLoader: this.createLoader((ids) =>
        this.variantService.getDataloader(ids),
      ),
    };
  }
}
