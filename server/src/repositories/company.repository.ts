import { APPLICATION } from '@/configs/constant';
import sequelize from '@/configs/database';
import { CompanyModel } from '@/models/company.model';

const { ROOT_SCHEMA } = APPLICATION;

export class RCompany extends CompanyModel {
    private model: CompanyModel;
    constructor() {
        super(sequelize, ROOT_SCHEMA);
    }

    async createSchema(schemaName: string) {
        await this.model.createSchema(schemaName);
    }
}
