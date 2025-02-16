import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { EAppointmentStatus } from 'src/common/shared/enums/appointment.enum';
import { FileUpload } from 'src/modules/file-uploads/entities/file-upload.entity';
import { MetadataResponse } from 'src/common/graphql/metadata.response';

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
  phone: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'timestamp' })
  date: number;

  @Field(() => EAppointmentStatus)
  @Column({ type: 'enum', enum: EAppointmentStatus })
  status: string;

  @Field(() => [ID], { nullable: true })
  @Column('int', { array: true, nullable: true })
  attachment_ids?: number[];

  @ManyToMany(
    () => FileUpload,
    (attachment) => attachment.appointment_attachments,
    {
      cascade: true,
    },
  )
  @JoinTable({
    name: 'appointment_attachments',
    joinColumn: {
      name: 'appointment_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'attachment_id',
      referencedColumnName: 'id',
    },
  })
  attachments: FileUpload[];
}

@ObjectType()
export class GetAppointmentType {
  @Field(() => MetadataResponse, { nullable: true })
  metadata?: MetadataResponse;

  @Field(() => [Appointment], { nullable: true })
  data?: Appointment[];
}
