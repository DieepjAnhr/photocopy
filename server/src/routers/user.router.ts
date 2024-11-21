import { BaseRouter } from '@/common/base/router.base';
import { UserController } from '@/controllers/user.controller';

export class UserRouter extends BaseRouter {
    initRouter() {
        this.router.route('/').get((req, res, next) => new UserController(req, res, next).get());

        return this.router;
    }
}
