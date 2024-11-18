import { APPLICATION } from '@/configs/constant';
import sequelize from '@/configs/database';
import { Sequelize } from 'sequelize';
import { Company, CompanyModel } from '@/models/company.model';
import { Role, RoleModel } from '@/models/role.model';
import { User, UserModel } from '@/models/user.model';

interface IModels {
    Company: typeof Company;
    Role: typeof Role;
    User: typeof User;
}

export class ModelFactory {
    private static connection = sequelize;

    static initModels(schema: string): IModels {
        const Company = this.initCompany(this.connection);
        const User = this.initUser(this.connection, schema);
        const Role = this.initRole(this.connection, schema);

        // User.associate({ Role });

        return { Company, User, Role };
    }

    static async createSchema(schemaName: string) {
        try {
            await this.connection.createSchema(schemaName, { logging: true, benchmark: true });
            return true;
        } catch (error) {
            return false;
        }
    }

    // private static async isExistSchema(schema: string) {
    //     const Company = new CompanyModel(this.connection, APPLICATION.ROOT_SCHEMA).initModel();
    //     const company = await Company.findOne({ where: { subdomain: schema } });
    //     if (!!company) return true;

    //     return false;
    // }

    private static initCompany(sequelize: Sequelize) {
        console.log('init company');

        return new CompanyModel(sequelize, APPLICATION.ROOT_SCHEMA).initModel();
    }

    private static initUser(sequelize: Sequelize, schema: string) {
        console.log('init user');

        return new UserModel(sequelize, schema).initModel();
    }

    private static initRole(sequelize: Sequelize, schema: string) {
        console.log('init role');

        return new RoleModel(sequelize, schema).initModel();
    }
}
