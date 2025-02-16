import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { AbstractResolver } from 'src/common/abstracts/resolver.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { PERMISSIONS } from 'src/common/shared/constants/permission.constant';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { Appointment, GetAppointmentType } from './entities/appointment.entity';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentInput } from './inputs/create-appointment.input';
import { UpdateAppointmentInput } from './inputs/update-appointment.input';
import { FileUpload } from '../file-uploads/entities/file-upload.entity';
import { UseInterceptors } from '@nestjs/common';
import { QueryOneInterceptor } from 'src/common/interceptors/query-one.interceptor';
import { QueryManyInterceptor } from 'src/common/interceptors/query-many.interceptor';

@Resolver(() => Appointment)
export class AppointmentResolver extends AbstractResolver<AppointmentService> {
  constructor(
    private readonly appointmentService: AppointmentService,
    appLogger: AppLogger,
  ) {
    super(appointmentService, appLogger);
  }

  @Query(() => Appointment, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_APPOINTMENT])
  @UseInterceptors(QueryOneInterceptor)
  async appointment(
    @Args({ name: 'query', nullable: true })
    condition: GetOneInput<Appointment>,
  ) {
    return await this.appointmentService.getOne(condition);
  }

  @Query(() => GetAppointmentType)
  @UseAuthGuard([PERMISSIONS.VIEW_APPOINTMENT])
  @UseInterceptors(QueryManyInterceptor)
  async appointments(
    @Args({ name: 'query', nullable: true })
    query: GetManyInput<Appointment>,
  ) {
    return await this.appointmentService.getMany(query);
  }

  @Mutation(() => Appointment)
  @UseAuthGuard([PERMISSIONS.CREATE_APPOINTMENT])
  async createAppointment(
    @Args('data') data: CreateAppointmentInput,
    @CurrentUser() user: User,
  ) {
    return await this.appointmentService.create(data, user);
  }

  @Mutation(() => Appointment)
  @UseAuthGuard([PERMISSIONS.UPDATE_APPOINTMENT])
  async updateAppointments(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateAppointmentInput,
    @CurrentUser() user: User,
  ) {
    return await this.appointmentService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_APPOINTMENT])
  async deleteAppointments(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.appointmentService.delete(id, user);
  }

  @ResolveField(() => [FileUpload], { nullable: true })
  async attachments(
    @Parent() appointment: Appointment,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const attachments = await loaders.fileUploadsLoader.load(
      appointment.attachment_ids || [],
    );
    return attachments;
  }

  @ResolveField(() => User, { nullable: true })
  async creator(
    @Parent() appointment: Appointment,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([appointment.created_by]);
    return users[0];
  }

  @ResolveField(() => User, { nullable: true })
  async updater(
    @Parent() appointment: Appointment,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([appointment.updated_by]);
    return users[0];
  }
}
