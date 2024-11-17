import { APPLICATION } from '@/configs/constant';
import sequelize from '@/configs/database';
import { CompanyModel } from '@/models/company.model';
import { RoleModel } from '@/models/role.model';
import { UserModel } from '@/models/user.model';
import { Sequelize } from 'sequelize';

export class ModelFactory {
    private static connection = sequelize;

    static initModels(schema: string) {
        const Company = this.initCompany(this.connection);
        const User = this.initUser(this.connection);
        const Role = this.initRole(this.connection, schema);

        User.associate({ Role });

        return { Company, User, Role };
    }

    static async createSchema(schemaName: string) {
        try {
            const isExistSchema = await this.isExistSchema(schemaName);
            if (isExistSchema) return true;

            await this.connection.createSchema(schemaName, { logging: true, benchmark: true });
            return true;
        } catch (error) {
            return false;
        }
    }

    private static async isExistSchema(schema: string) {
        const Company = new CompanyModel(this.connection, APPLICATION.ROOT_SCHEMA).initModel();
        const company = await Company.findOne({ where: { subdomain: schema } });
        if (!!company) return true;

        return false;
    }

    private static initCompany(sequelize: Sequelize) {
        return new CompanyModel(sequelize, APPLICATION.ROOT_SCHEMA).initModel();
    }

    private static initUser(sequelize: Sequelize) {
        return new UserModel(sequelize, APPLICATION.ROOT_SCHEMA).initModel();
    }

    private static initRole(sequelize: Sequelize, schema: string) {
        return new RoleModel(sequelize, schema).initModel();
    }
}
