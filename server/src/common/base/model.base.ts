import { InitOptions } from 'sequelize';

export abstract class BaseModel {
    protected sequelizeOptions: InitOptions;
    protected schema: string;

    constructor({ sequelize, modelName }: InitOptions, schema: string) {
        this.sequelizeOptions = {
            sequelize: sequelize,
            modelName: modelName,
            timestamps: true,
            underscored: true,
            createdAt: true,
            updatedAt: true,
        };
        this.schema = schema;
    }
}
