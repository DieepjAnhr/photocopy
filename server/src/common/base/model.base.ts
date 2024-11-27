import { InitOptions } from 'sequelize';

export abstract class BaseModel {
    private _sequelizeOptions: InitOptions;
    private _tenant: string;

    constructor({ sequelize, modelName }: InitOptions, tenant: string) {
        this._sequelizeOptions = {
            sequelize: sequelize,
            modelName: modelName,
            timestamps: true,
            underscored: true,
            createdAt: true,
            updatedAt: true,
        };
        this._tenant = tenant;
    }

    protected get sequelizeOption() {
        return this._sequelizeOptions;
    }

    protected get tenant() {
        return this._tenant;
    }
}
