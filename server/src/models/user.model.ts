import { BaseModel } from '@/common/base/model.base';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface UserAttributes {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role_id: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    public role_id!: number;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public static associate(models: any): void {
        User.hasOne(models.Role, {
            foreignKey: 'role_id',
            as: 'role',
        });
    }
}

export class UserModel extends BaseModel {
    constructor(sequelize: Sequelize, schema: string) {
        super({ sequelize, schema, modelName: 'user' });
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
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                role_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'roles',
                        key: 'id',
                    },
                    allowNull: false,
                },
            },
            this.sequelizeOptions
        );

        return User;
    }
}
