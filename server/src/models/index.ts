import { ModelCtor } from "sequelize-typescript";
import { MUser } from "./user.model";
import { MCategory } from "./category.model";
import sequelize from "@/configs/sequelize";

export class ModelFactory {
    static USER = 'user';
    static CATEGORY = 'category';

    private static readonly ROOT_TENANT_PREFIX = 'root';
    private static readonly NODE_TENANT_PREFIX = 'node';
    private static readonly HASH_MODEL = {
        root: {
            [this.USER]: MUser,
        },
        node: {
            [this.CATEGORY]: MCategory,
        }
    }

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
        if ([this.USER].includes(modelName))
            return this.getRootTenant();
        else
            return this.getNodeTenant(tenant);
    }

    private static getRootTenant(): string {
        return `${this.ROOT_TENANT_PREFIX}_tenant`;
    }

    private static getNodeTenant(tenant: string): string {
        return `${this.NODE_TENANT_PREFIX}_${tenant}`;
    }

    private static getUserModel(tenant: string) {
        return sequelize.getRepository(MUser).schema(tenant);
    }

    private static getCategoryModel(tenant: string) {
        return sequelize.getRepository(MCategory).schema(tenant);
    }

    static async createNodeTenant(tenant: string) {
        try {
            tenant = this.getNodeTenant(tenant);
            const { node } = this.HASH_MODEL;

            await sequelize.createSchema(tenant, {
                logging: true,
            });

            await sequelize.getRepository(node[this.CATEGORY]).schema(tenant).sync();
            
            return true;
        } catch (error) {
            return false;
        }
    }
}
