import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { MUser } from './user.model';

@Table({timestamps: true})
export class MCategory extends Model<MCategory> {
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
