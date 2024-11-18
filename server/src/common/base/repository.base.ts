import { Company } from '@/models/company.model';
import { ModelFactory } from '../factories/model.factory';
import { Role } from '@/models/role.model';
import { User } from '@/models/user.model';

export abstract class BaseRepository {
    protected schema: string;
    protected Company: typeof Company;
    protected Role: typeof Role;
    protected User: typeof User;

    constructor(schema: string) {
        this.schema = schema;

        const { Company, Role, User } = ModelFactory.initModels(schema);
        this.Company = Company;
        this.Role = Role;
        this.User = User;
    }
}
