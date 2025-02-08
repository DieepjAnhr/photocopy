import DataLoader from 'dataloader';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { Role } from 'src/modules/role/entity/role.entity';
import { User } from 'src/modules/user/entity/user.entity';

export interface IDataloader {
  usersLoader: DataLoader<number[], User[]>;
  rolesLoader: DataLoader<number[], Role[]>;
  permissionsLoader: DataLoader<number[], Permission[]>;
}
