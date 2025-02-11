import { Injectable } from '@nestjs/common';
import { RoleService } from 'src/modules/role/role.service';
import { IDataloader } from '../shared/interfaces/dataloader.interface';
import DataLoader from 'dataloader';
import { PermissionService } from 'src/modules/permission/permission.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
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
      usersLoader: this.createLoader((ids) =>
        this.userService.getDataloader(ids),
      ),

      rolesLoader: this.createLoader((ids) =>
        this.roleService.getDataloader(ids),
      ),

      permissionsLoader: this.createLoader((ids) =>
        this.permissionService.getDataloader(ids),
      ),
    };
  }
}
