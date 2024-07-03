"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
const models_1 = require("@/models");
const user_repository_1 = require("./user.repository");
const category_repository_1 = require("./category.repository");
class RepositoryFactory {
    static USER = models_1.ModelFactory.USER;
    static CATEGORY = models_1.ModelFactory.CATEGORY;
    static repositoryCache = {};
    static getRepository(repositoryName, tenant) {
        const cacheKey = `${repositoryName}-${tenant}`;
        if (this.repositoryCache[cacheKey]) {
            return this.repositoryCache[cacheKey];
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
        return repository;
    }
    static getUserRepository(tenant) {
        const model = models_1.ModelFactory.getModel(this.USER, tenant);
        return new user_repository_1.RUser(model);
    }
    static getCategoryRepository(tenant) {
        const model = models_1.ModelFactory.getModel(this.CATEGORY, tenant);
        return new category_repository_1.RCategory(model);
    }
}
exports.RepositoryFactory = RepositoryFactory;
//# sourceMappingURL=index.js.map