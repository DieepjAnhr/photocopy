import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { Appointment } from './entities/appointment.entity';
import { AppointmentRepository } from './appointment.repository';

@Injectable()
export class AppointmentService extends AbstractService<
  Appointment,
  AppointmentRepository
> {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    appLogger: AppLogger,
  ) {
    super(appointmentRepository, appLogger);
  }
}
