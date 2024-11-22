import http from 'http';
import 'module-alias/register';
import dotenv from 'dotenv';

import { APPLICATION } from './configs/constant';
import sequelize from './configs/database';
import { Application } from './app';

dotenv.config();
const { HOST, PORT } = APPLICATION;

const main = async () => {
    try {
        await sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                const application = new Application().getApplication();
                const server = http.createServer(application);
                server.listen(PORT, () => console.log(`Server runing at http://${HOST}:${PORT}/`));
            })
            .catch((error) => console.error('Unable to connect to the database:', error));
    } catch (err) {
        console.log(err);
    }
};

main();
