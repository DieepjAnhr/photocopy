import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import 'module-alias/register';
import { APPLICATION } from './configs/constant';
import app from './app';

try {
    const server = http.createServer(app);
    server.listen(APPLICATION.port, () => (
        console.log(`Server runing at http://${APPLICATION.host}:${APPLICATION.port}/`)
    ));
} catch (err) {
    console.log(err);
}