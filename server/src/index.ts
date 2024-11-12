import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import 'module-alias/register';
import { APPLICATION } from './configs/constant';
import app from './app';
import sequelize from './configs/database';

const main = async () => {
    try {
        await sequelize.authenticate().catch((error) => {
            console.error('Unable to connect to the database:', error);
          });
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: false }).catch((error) => {
            console.error('Unable to create database: ', error)
        });
        console.log('Database & tables created!');
          
        const server = http.createServer(app);
        server.listen(APPLICATION.port, () => (
            console.log(`Server runing at http://${APPLICATION.host}:${APPLICATION.port}/`)
        ));
    } catch (err) {
        console.log(err);
    }
}

main()