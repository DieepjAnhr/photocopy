import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { MCategory } from './category.model';

@Table({timestamps: true})
export class MUser extends Model<MUser> {
  @Column
  username!: string;

  @Column
  password!: string;

  @Column
  name!: string;

  @HasMany(() => MCategory)
  categories!: MCategory[];
}
