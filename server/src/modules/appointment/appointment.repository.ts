import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstracts/repository.abstract';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentRepository extends AbstractRepository<Appointment> {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {
    super(appointmentRepository);
  }
}
