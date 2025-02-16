import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Appointment } from './entities/appointment.entity';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';
import { AppointmentRepository } from './appointment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), LoggerModule],
  providers: [AppointmentResolver, AppointmentService, AppointmentRepository],
  exports: [AppointmentService, AppointmentResolver],
})
export class AppointmentModule {}
