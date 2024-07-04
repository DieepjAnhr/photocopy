import { ModelFactory } from "@/models";
import { RUser } from "./user.repository";
import { RCategory } from "./category.repository";

type RepositoryList = RUser | RCategory

export class RepositoryFactory {
    static USER = ModelFactory.USER;
    static CATEGORY = ModelFactory.CATEGORY;

    private static repositoryCache: { [key: string]: RepositoryList } = {};

    static getRepository<T extends RepositoryList>(repositoryName: string, tenant: string): T {
        const cacheKey = `${repositoryName}-${tenant}`;
        if (this.repositoryCache[cacheKey]) {
            return this.repositoryCache[cacheKey] as T;
        }

        let repository;
        switch (repositoryName) {
            case this.USER:
                repository = this.getUserRepository(tenant);
                break;
            case this.CATEGORY:
                repository = this.getCategoryRepository(tenant);
                break;
            default:
                throw new Error(`Repository ${repositoryName} not supported for tenant ${tenant}!`);
        }

        this.repositoryCache[cacheKey] = repository;
        return repository as T;
    }

    private static getUserRepository(tenant: string): RUser {
        const model = ModelFactory.getModel(this.USER, tenant);
        return new RUser(model);
    }

    private static getCategoryRepository(tenant: string): RCategory {
        const model = ModelFactory.getModel(this.CATEGORY, tenant);
        return new RCategory(model);
    }

    static async createSchema(tenant: string) {
        return await ModelFactory.createSchema(tenant)
    }
}
