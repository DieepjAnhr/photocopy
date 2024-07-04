import { ModelCtor, Model } from "sequelize-typescript";
import { MUser } from "./user.model";
import { MCategory } from "./category.model";
import sequelize from "@/configs/sequelize";

export class ModelFactory {
    static ROOT_MODELS = [MUser];
    static NODE_MODELS = [MCategory];
    static USER = 'user';
    static CATEGORY = 'category';
    static ROOT_MODEL_NAMES = [this.USER];

    static ROOT_TENANT_PREFIX = 'root';
    static NODE_TENANT_PREFIX = 'node';

    static getModel(modelName: string, tenant: string): ModelCtor<any> {
        tenant = this.getTenant(modelName, tenant);

        switch (modelName) {
            case this.USER:
                return this.getUserModel(tenant) as ModelCtor<MUser>;
            case this.CATEGORY:
                return this.getCategoryModel(tenant) as ModelCtor<MCategory>;
            default:
                throw new Error(`Model ${modelName} not supported!`)
        }
    }

    private static getTenant(modelName: string, tenant: string): string {
        if (this.ROOT_MODEL_NAMES.includes(modelName))
            return `${this.ROOT_TENANT_PREFIX}_tenant`;
        else
            return `${this.NODE_TENANT_PREFIX}_${tenant}`;
    }

    private static getUserModel(tenant: string) {
        return sequelize.getRepository(MUser).schema(tenant);
    }

    private static getCategoryModel(tenant: string) {
        return sequelize.getRepository(MCategory).schema(tenant);
    }

    static async createSchema(tenant: string) {
        try {
            sequelize.createSchema(tenant, {
                logging: true,
            });

            for (const model of this.NODE_MODELS) {
                await sequelize.getRepository(model).schema(tenant).sync();
            }
            
            return true;
        } catch (error) {
            return false;
        }
    }
}
