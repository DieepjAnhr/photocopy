import { BaseModel } from '@/common/base/model.base';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface RoleAttributes {
    id: number;
    name: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}
export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    declare id: number;
    declare name: string;

    declare readonly created_at: Date;
    declare readonly updated_at: Date;
}

export class RoleModel extends BaseModel {
    constructor(sequelize: Sequelize, schema: string) {
        super({ sequelize, modelName: 'role' }, schema);
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

        return Role.schema(this.schema);
    }
}
