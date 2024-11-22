import { BaseRepository } from '@/common/base/repository.base';
import { FactoryModel } from '@/common/factories/model.factory';
import { CompanyCreationAttributes } from '@/models/company.model';

export class RCompany extends BaseRepository {
    async create(data: CompanyCreationAttributes) {
        const company = await this.Company.create(data);
        await this.createSchema(company.subdomain);
        return company;
    }

    private async createSchema(schemaName: string) {
        try {
            await FactoryModel.createSchema(schemaName);
            await Promise.all([this.Role.sync({ alter: true }), this.User.sync({ alter: true })]);
            return true;
        } catch (error) {
            return false;
        }
    }
}
