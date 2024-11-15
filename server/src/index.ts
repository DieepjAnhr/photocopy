import http from 'http';
import 'module-alias/register';
import dotenv from 'dotenv';

import { APPLICATION } from './configs/constant';
import app from './app';
import sequelize from './configs/database';

dotenv.config();
const { HOST, PORT } = APPLICATION;
const main = async () => {
    try {
        await sequelize.authenticate().catch((error) => {
            console.error('Unable to connect to the database:', error);
        });
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: false }).catch((error) => {
            console.error('Unable to create database: ', error);
        });
        console.log('Database & tables created!');

        const server = http.createServer(app);
        server.listen(PORT, () => console.log(`Server runing at http://${HOST}:${PORT}/`));
    } catch (err) {
        console.log(err);
    }
};

main();
