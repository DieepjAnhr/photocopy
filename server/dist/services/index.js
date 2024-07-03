"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceFactory = void 0;
const repositories_1 = require("@/repositories");
const user_service_1 = require("./user.service");
const category_service_1 = require("./category.service");
class ServiceFactory {
    static USER = repositories_1.RepositoryFactory.USER;
    static CATEGORY = repositories_1.RepositoryFactory.CATEGORY;
    static serviceCache = {};
    static getService(serviceName, tenant) {
        const cacheKey = `${serviceName}-${tenant}`;
        if (this.serviceCache[cacheKey]) {
            return this.serviceCache[cacheKey];
        }
        let service;
        switch (serviceName) {
            case this.USER:
                service = this.getUserService(tenant);
                break;
            case this.CATEGORY:
                service = this.getCategoryService(tenant);
                break;
            default:
                throw new Error(`Service ${serviceName} not supported for tenant ${tenant}!`);
        }
        this.serviceCache[cacheKey] = service;
        return service;
    }
    static getUserService(tenant) {
        const repository = repositories_1.RepositoryFactory.getRepository(this.USER, tenant);
        const service = new user_service_1.SUser();
        service.setDependency({
            user: repository
        });
        return service;
    }
    static getCategoryService(tenant) {
        const repository = repositories_1.RepositoryFactory.getRepository(this.CATEGORY, tenant);
        const service = new category_service_1.SCategory();
        service.setDependency({
            category: repository
        });
        return service;
    }
}
exports.ServiceFactory = ServiceFactory;
//# sourceMappingURL=index.js.map