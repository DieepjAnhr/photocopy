import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { RoleModule } from 'src/modules/role/role.module';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule, RoleModule, PermissionModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
