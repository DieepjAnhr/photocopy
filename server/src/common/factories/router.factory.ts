import { UserRouter } from '@/routers/user.router';
import { Router } from 'express';

export class FactoryRouter {
    private static router = Router();

    static initRouters() {
        this.router.use('/users', this.userRouter());

        return this.router;
    }

    static userRouter() {
        return new UserRouter().initRouter();
    }
}
