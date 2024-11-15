import { BaseModel } from '@/common/base/model.base';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface RoleAttributes {
    id: number;
    name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}
class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public id!: number;
    public name!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

export class RoleModel extends BaseModel {
    constructor(sequelize: Sequelize, schema: string) {
        super({ sequelize, schema, modelName: 'role' });
    }

    initModel() {
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
            this.sequelizeOptions
        );

        return Role;
    }
}
