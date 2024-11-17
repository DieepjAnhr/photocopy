import { ModelFactory } from '@/common/factories/model.factory';

export class RCompany {
    private schema: string;

    constructor(schema: string) {
        this.schema = schema;
    }

    async createSchema() {
        await ModelFactory.createSchema(this.schema);
    }
}
