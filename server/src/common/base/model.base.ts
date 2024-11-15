import { InitOptions } from 'sequelize';

export abstract class BaseModel {
    protected sequelizeOptions: InitOptions;

    constructor({ sequelize, schema, modelName }: InitOptions) {
        this.sequelizeOptions = {
            sequelize: sequelize,
            schema: schema,
            modelName: modelName,
            timestamps: true,
            underscored: true,
        };
    }
}
