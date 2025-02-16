import DataLoader from 'dataloader';
import { Attribute } from 'src/modules/attributes/entities/attribute.entity';
import { Blog } from 'src/modules/blogs/entities/blog.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { FileUpload } from 'src/modules/file-uploads/entities/file-upload.entity';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Variant } from 'src/modules/variants/entities/variant.entity';

export interface IDataloader {
  attributesLoader: DataLoader<number[], Attribute[]>;
  blogsLoader: DataLoader<number[], Blog[]>;
  categoriesLoader: DataLoader<number[], Category[]>;
  fileUploadLoader: DataLoader<number[], FileUpload[]>;
  orderDetailsLoader: DataLoader<number[], OrderDetail[]>;
  ordersLoader: DataLoader<number[], Order[]>;
  permissionsLoader: DataLoader<number[], Permission[]>;
  productLoader: DataLoader<number[], Product[]>;
  rolesLoader: DataLoader<number[], Role[]>;
  usersLoader: DataLoader<number[], User[]>;
  variantsLoader: DataLoader<number[], Variant[]>;
}
