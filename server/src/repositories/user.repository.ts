import { ModelFactory } from '@/common/factories/model.factory';

export class RUser {
    private schema: string;

    constructor(schema: string) {
        this.schema = schema;
    }

    async isAdmin(user_id: number) {
        const { User, Role } = ModelFactory.initModels(this.schema);

        const user = await User.findOne({ where: { id: user_id }, include: Role });
        return !!user;
    }
}
