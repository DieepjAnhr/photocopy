import { Module } from '@nestjs/common';

import { SettingService } from './setting.service';
import { UtilModule } from '../services/util.module';

@Module({
  imports: [UtilModule],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
