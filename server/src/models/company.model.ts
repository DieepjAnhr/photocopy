import { BaseModel } from '@/common/base/model.base';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface CompanyAttributes {
    id: number;
    name: string;
    subdomain: string;
}

export interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id'> {}
export class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
    declare id: number;
    declare name: string;
    declare subdomain: string;

    declare readonly created_at: Date;
    declare readonly updated_at: Date;
}

export class CompanyModel extends BaseModel {
    constructor(sequelize: Sequelize, schema: string) {
        super({ sequelize, modelName: 'company' }, schema);
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
                subdomain: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
            },
            this.sequelizeOptions
        );

        return Company.schema(this.schema);
    }

    async createSchema(schemaName: string) {
        const { sequelize } = this.sequelizeOptions;
        await sequelize.createSchema(schemaName, { logging: true, benchmark: true });
    }
}
