import { BaseModel } from '@/common/base/model.base';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface UserAttributes {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role_id: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: number;
    declare first_name: string;
    declare last_name: string;
    declare email: string;
    declare role_id: number;

    declare readonly created_at: Date;
    declare readonly updated_at: Date;

    // public static associate(models: any): void {
    //     User.hasOne(models.Role, {
    //         foreignKey: 'role_id',
    //         as: 'role',
    //     });
    // }
}

export class UserModel extends BaseModel {
    constructor(sequelize: Sequelize, schema: string) {
        super({ sequelize, modelName: 'user' }, schema);
    }

    initModel() {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                first_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                last_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                role_id: {
                    type: DataTypes.INTEGER,
                    // references: {
                    //     model: 'roles',
                    //     key: 'id',
                    // },
                    allowNull: true,
                },
            },
            this.sequelizeOptions
        );

        return User.schema(this.schema);
    }
}
