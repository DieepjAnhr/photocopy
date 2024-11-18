import { BaseRepository } from '@/common/base/repository.base';
import { ModelFactory } from '@/common/factories/model.factory';
import { CompanyCreationAttributes } from '@/models/company.model';

export class RCompany extends BaseRepository {
    async create(data: CompanyCreationAttributes) {
        await this.createSchema();
        console.log('~~~create schema done');

        const company = await this.Company.create(data);
        return company;
    }

    private async createSchema() {
        try {
            await ModelFactory.createSchema('root');
            await this.Company.sync({ alter: true });
            console.log('~~~create company table done');
            await this.Role.sync({ alter: true });
            console.log('~~~create role table done');
            await this.User.sync({ alter: true });
            console.log('~~~create user table done');

            return true;
        } catch (error) {
            return false;
        }
    }
}
