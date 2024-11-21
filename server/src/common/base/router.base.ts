import { Router } from 'express';

export abstract class BaseRouter {
    protected router: Router;

    constructor() {
        this.router = Router();
    }

    protected initRouter(): Router {
        return this.router;
    }
}
