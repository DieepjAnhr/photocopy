import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EAppointmentStatus } from 'src/common/shared/enums/appointment.enum';

registerEnumType(EAppointmentStatus, {
  name: 'EAppointmentStatus',
  description: 'Enum for appointment status',
});

@InputType()
export class CreateAppointmentInput {
  @Field(() => Int)
  @IsOptional()
  customer_id: number;

  @Field(() => String)
  @IsOptional()
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  content: string;

  @Field(() => Number)
  @IsNotEmpty()
  date: number;

  @Field(() => [Int], { nullable: true })
  @IsNotEmpty()
  @IsArray()
  attachment_ids: number[];

  @Field(() => EAppointmentStatus)
  @IsEnum(EAppointmentStatus, {
    message: `Chỉ áp dụng các giá trị ${Object.values(EAppointmentStatus).join(', ')}!`,
  })
  status: string;
}
