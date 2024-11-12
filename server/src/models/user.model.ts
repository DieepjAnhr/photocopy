import { BaseModel } from '@/common/base/model.base';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public roleId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate(models: any): void {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
      });
    }
}

export class UserModel implements BaseModel {
  private sequelize: Sequelize;
  private schema: string;

  constructor(sequelize: Sequelize, schema: string) {
    this.sequelize = sequelize;
    this.schema = schema;
  }

  defineModel(sequelize = this.sequelize, schema = this.schema) {
    User.init(
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          firstName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          roleId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'roles',
              key: 'id',
            },
            allowNull: false,
          },
        },
        {
            sequelize,
          schema,
          tableName: 'users',
        }
      );
    
      return User;
  }
}
