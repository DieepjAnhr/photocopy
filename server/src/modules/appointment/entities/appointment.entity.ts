import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { EAppointmentStatus } from 'src/common/shared/enums/appointment.enum';

registerEnumType(EAppointmentStatus, {
  name: 'EAppointmentStatus',
  description: 'Enum for appointment status',
});

@ObjectType({ description: 'appointment' })
@Entity({ name: 'appointments' })
export class Appointment extends AbstractEntity {
  @Field(() => ID)
  @Column()
  customer_id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'timestamp' })
  date: number;

  @Field(() => [ID], { nullable: true })
  @Column('string', { array: true, nullable: true })
  attachment_ids: number[];

  @Field(() => EAppointmentStatus)
  @Column({ type: 'enum', enum: EAppointmentStatus })
  status: string;
}

@ObjectType()
export class GetAppointmentType {
  @Field(() => Number, { nullable: true })
  count?: number;

  @Field(() => [Appointment], { nullable: true })
  data?: Appointment[];
}
