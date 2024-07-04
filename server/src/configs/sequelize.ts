import { MCategory } from '@/models/category.model';
import { MUser } from '@/models/user.model';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'postgres',
  dialect: 'postgres',
  username: 'user',
  password: 'password',
  host: 'localhost',
  port: 5432,
  logging: true,
  models: [MUser, MCategory],
});

export default sequelize;