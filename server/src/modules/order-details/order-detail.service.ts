import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstracts/service.abstract';
import { AppLogger } from 'src/common/logger/logger.service';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailRepository } from './order-detail.repository';
import { DeepPartial } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrderDetailService extends AbstractService<
  OrderDetail,
  OrderDetailRepository
> {
  constructor(
    private readonly orderDetailRepository: OrderDetailRepository,
    appLogger: AppLogger,
  ) {
    super(orderDetailRepository, appLogger);
  }

  async create(
    data: DeepPartial<OrderDetail>,
    createdBy?: User,
  ): Promise<OrderDetail> {
    const createdById = createdBy?.id;
    this.logger.debug(
      `Create record by ${createdById} with arg: ${JSON.stringify(data)}`,
    );

    data.total_cost = data.price * data.quantity;
    data.final_cost =
      data.total_cost + data.service_fee + data.tax - data.discount;

    const result = await this.repository.create({
      ...data,
      created_by: createdById,
      updated_by: createdById,
    });

    return result;
  }

  async update(
    id: number,
    data: DeepPartial<OrderDetail>,
    updatedBy?: User,
  ): Promise<OrderDetail | null> {
    const updatedById = updatedBy?.id;
    this.logger.debug(
      `Update record by ${updatedById} with arg: ${JSON.stringify(data)}`,
    );

    const model = await this.repository.getOne({ where: { id } as any });

    if (!model) return null;

    Object.assign(model, data, { updated_by: updatedById });

    model.total_cost = model.price * model.quantity;
    model.final_cost =
      model.total_cost + model.service_fee + model.tax - model.discount;

    return await this.repository.save(model);
  }
}
