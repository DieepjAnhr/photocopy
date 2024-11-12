import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface RoleAttributes {
  id: number;
  name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}
class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

export class RoleModel {
    private sequelize: Sequelize;
  private schema: string;

  constructor(sequelize: Sequelize, schema: string) {
    this.sequelize = sequelize;
    this.schema = schema;
  }

  defineModel(sequelize = this.sequelize, schema = this.schema) {
    Role.init(
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
        },
        {
          sequelize,
          schema,
          tableName: 'roles',
        }
      );
    
      return Role;
  }
}
