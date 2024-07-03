import { MCategory } from '@/models/category.model';
import { MUser } from '@/models/user.model';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'your_database',
  dialect: 'postgres',
  username: 'root',
  password: '',
  host: 'localhost',
  port: 5432,
  models: [MUser, MCategory],
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})

export default sequelize;