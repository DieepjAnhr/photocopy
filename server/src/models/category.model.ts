import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement  } from 'sequelize-typescript';
import { MUser } from './user.model';

@Table({
  tableName: 'categories',
  timestamps: true
})
export class MCategory extends Model<MCategory> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  })
  name!: string;

  @ForeignKey(() => MUser)
  @Column({
    allowNull: false
  })
  creatorId!: number;

  @BelongsTo(() => MUser)
  creator!: MUser;
}
