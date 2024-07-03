import { ModelCtor } from "sequelize-typescript";
import { MUser } from "./user.model";
import { MCategory } from "./category.model";

export class ModelFactory {
    static USER = 'user';
    static CATEGORY = 'category';

    static getModel(modelName: string, tenant: string): ModelCtor<any> {
        switch (modelName) {
            case this.USER:
                return this.getUserModel(tenant) as ModelCtor<MUser>;
            case this.CATEGORY:
                return this.getCategoryModel(tenant) as ModelCtor<MCategory>;
            default:
                throw new Error(`Model ${modelName} not supported!`)
        }
    }

    private static getUserModel(tenant: string) {
        return MUser.schema(tenant);
    }

    private static getCategoryModel(tenant: string) {
        return MCategory.schema(tenant);
    }
}
