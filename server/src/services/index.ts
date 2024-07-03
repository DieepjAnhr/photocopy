import { RepositoryFactory } from "@/repositories";
import { SUser } from "./user.service";
import { SCategory } from "./category.service";
import { RUser } from "@/repositories/user.repository";
import { RCategory } from "@/repositories/category.repository";

type ServiceList = SUser | SCategory

export class ServiceFactory {
    static USER = RepositoryFactory.USER;
    static CATEGORY = RepositoryFactory.CATEGORY;

    private static serviceCache: { [key: string]: ServiceList } = {};

    static getService<T extends ServiceList>(serviceName: string, tenant: string): T {
        const cacheKey = `${serviceName}-${tenant}`;
        if (this.serviceCache[cacheKey]) {
            return this.serviceCache[cacheKey] as T;
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
        return service as T;
    }

    private static getUserService(tenant: string): SUser {
        const repository = RepositoryFactory.getRepository<RUser>(this.USER, tenant);
        const service = new SUser();
        service.setDependency({
            user: repository
        });
        return service;
    }

    private static getCategoryService(tenant: string): SCategory {
        const repository = RepositoryFactory.getRepository<RCategory>(this.CATEGORY, tenant);
        const service = new SCategory();
        service.setDependency({
            category: repository
        });
        return service;
    }
}
