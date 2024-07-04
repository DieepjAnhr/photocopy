import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement  } from 'sequelize-typescript';
import { MCategory } from './category.model';

@Table({
  tableName: 'users',
  timestamps: true
})
export class MUser extends Model<MUser> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  username!: string;

  @Column
  password!: string;

  @Column
  name!: string;

  @HasMany(() => MCategory)
  categories!: MCategory[];
}
