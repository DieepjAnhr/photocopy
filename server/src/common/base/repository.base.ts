import { Company } from "@/models/company.model";
import { Role } from "@/models/role.model";
import { User } from "@/models/user.model";
import { InternalServerError } from "../error";

export interface IModelsInjection {
    Company?: typeof Company;
    Role?: typeof Role;
    User?: typeof User;
}

export abstract class BaseRepository {
    private _tenant: string;
    private _models: Partial<IModelsInjection> = {};

    constructor(tenant: string) {
        this._tenant = tenant;
    }

    protected get tenant(): string {
        return this._tenant;
    }

    public injectModels(models: IModelsInjection): void {
        this._models = { ...this._models, ...models };
    }

    private getModel<K extends keyof IModelsInjection>(modelName: K): NonNullable<IModelsInjection[K]> {
        const model = this._models[modelName];
        if (!model) throw new InternalServerError(`${this.constructor.name}: ${modelName} model is not injected!`);

        return model;
    }

    protected get companyModel() {
        return this.getModel('Company');
    }

    protected get roleModel() {
        return this.getModel('Role');
    }

    protected get userModel() {
        return this.getModel('User');
    }
}
