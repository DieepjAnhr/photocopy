import { CompanyRepository } from "@/repositories/company.repository";
import { RoleRepository } from "@/repositories/role.repository";
import { UserRepository } from "@/repositories/user.repository";
import { IModels, ModelFactory } from "./model.factory";

type RepositoryType = CompanyRepository | RoleRepository | UserRepository;

export class RepositoryFactory {
    private _tenant: string;
    private _repositories: Record<string, RepositoryType>;

    constructor(tenant: string) {
        this._tenant = tenant;
    }

    public initRepositories() {
        const models = new ModelFactory(this._tenant).initModels;
        const repositoryClasses: Record<string, new (tenant: string) => RepositoryType> = {
            company: CompanyRepository,
            role: RoleRepository,
            user: UserRepository,
        };

        for (const [name, RepositoryClass] of Object.entries(repositoryClasses)) {
            this.registerRepository(name, RepositoryClass, models);
        }
        return this._repositories;
    }

    private registerRepository<T extends RepositoryType>(
        name: string,
        RepositoryClass: new (tenant: string) => T,
        models: IModels
    ) {
        const repository = new RepositoryClass(this._tenant);
        repository.injectModels(models);
        this._repositories[name] = repository;
    }

    public getRepository(name: keyof typeof this._repositories): RepositoryType {
        return this._repositories[name];
    }
}
