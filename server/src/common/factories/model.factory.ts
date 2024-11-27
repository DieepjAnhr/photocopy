import { APPLICATION } from '@/configs/constant';
import sequelize from '@/configs/database';
import { Sequelize } from 'sequelize';
import { Company, CompanyModel } from '@/models/company.model';
import { Role, RoleModel } from '@/models/role.model';
import { User, UserModel } from '@/models/user.model';

export interface IModels {
    company: typeof Company;
    role: typeof Role;
    user: typeof User;
}

export type ModelType = CompanyModel | RoleModel | UserModel;

export class ModelFactory {
    private _tenant: string;
    private _connection: Sequelize;
    private _models: Record<string, ModelType>;

    constructor(tenant: string) {
        this._tenant = tenant
        this._connection = sequelize;
    }

    public get initModels(): IModels {
        const company = this.initCompany();
        const user = this.initUser();
        const role = this.initRole();

        // User.associate({ Role });

        return { company, user, role };
    }

    async createSchema() {
        try {
            await this._connection.createSchema(this._tenant, { logging: true, benchmark: true });
            return true;
        } catch (error) {
            return false;
        }
    }

    private registerModel<T extends ModelType>(
        name: string,
        ModelClass: new (connection: Sequelize, tenant: string) => T
    ) {
        const model = new ModelClass(this._connection, this._tenant);

    }

    private initCompany() {
        return new CompanyModel(this._connection, APPLICATION.ROOT_SCHEMA).initModel();
    }

    private initUser() {
        return new UserModel(this._connection, this._tenant).initModel();
    }

    private initRole() {
        return new RoleModel(this._connection, this._tenant).initModel();
    }
}
