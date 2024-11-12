import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'postgres',
  dialect: 'postgres',
  username: 'user',
  password: 'password',
  host: 'localhost',
  port: 5432,
  logging: true
});

export default sequelize;