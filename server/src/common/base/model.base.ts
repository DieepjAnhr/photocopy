import { Sequelize } from 'sequelize';

export abstract class BaseModel {
    private sequelize: Sequelize;
  private schema: string;
  constructor(sequelize: Sequelize, schema: string) {
    this.sequelize = sequelize;
    this.schema = schema;
  }
  defineModel(sequelize = this.sequelize, schema = this.schema) {

  }
}