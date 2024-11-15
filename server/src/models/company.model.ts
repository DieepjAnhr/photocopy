import { BaseModel } from '@/common/base/model.base';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface CompanyAttributes {
    id: number;
    name: string;
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id'> {}
class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
    public id!: number;
    public name!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

export class CompanyModel extends BaseModel {
    constructor(sequelize: Sequelize, schema: string) {
        super({ sequelize, schema, modelName: 'company' });
    }

    initModel() {
        Company.init(
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

        return Company;
    }

    async createSchema(schemaName: string) {
        const { sequelize } = this.sequelizeOptions;
        await sequelize.createSchema(schemaName, { logging: true, benchmark: true });
    }
}
