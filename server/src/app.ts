import express from 'express';
import cors from 'cors';
import { FactoryRouter } from './common/factories/router.factory';

export class Application {
    private app: express.Express;
    constructor() {
        this.app = express();
    }

    getApplication() {
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
        this.app.use('/v1', this.getRouters());

        return this.app;
    }

    private getRouters() {
        return FactoryRouter.initRouters();
    }
}
