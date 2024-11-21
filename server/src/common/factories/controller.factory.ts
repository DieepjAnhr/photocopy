import { CustomNextFunction, CustomRequest, CustomResponse } from '@/common/interfaces/custom-express';
import { UserController } from '@/controllers/user.controller';

interface IControllers {
    User: UserController;
}

export class FactoryController {
    private request: CustomRequest;
    private response: CustomResponse;
    private next: CustomNextFunction;

    constructor(request: CustomRequest, response: CustomResponse, next: CustomNextFunction) {
        this.request = request;
        this.response = response;
        this.next = next;
    }

    initControllers(): IControllers {
        const User = this.initUser(this.request, this.response, this.next);
        return { User };
    }

    initUser(request: CustomRequest, response: CustomResponse, next: CustomNextFunction) {
        return new UserController(request, response, next);
    }
}
