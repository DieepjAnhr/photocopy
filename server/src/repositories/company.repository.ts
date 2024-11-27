import { BaseRepository } from '@/common/base/repository.base';
import { ModelFactory } from '@/common/factories/model.factory';
import { CompanyCreationAttributes } from '@/models/company.model';

export class CompanyRepository extends BaseRepository {
    async create(data: CompanyCreationAttributes) {
        const company = await this.companyModel.create(data);
        await this.createSchema();
        return company;
    }

    private async createSchema() {
        try {
            await new ModelFactory(this.tenant).createSchema();

            await Promise.all([this.roleModel.sync({ alter: true }), this.userModel.sync({ alter: true })]);
            return true;
        } catch (error) {
            return false;
        }
    }
}
