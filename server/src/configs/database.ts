import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'photocopy',
    dialect: 'postgres',
    username: 'admin',
    password: 'abcd1234!@#$',
    host: 'localhost',
    port: 5432,
    logging: true,
});

export default sequelize;
