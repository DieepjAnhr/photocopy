import { _createError } from '@/common/create-error';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../interfaces/custom-express';

export abstract class BaseController {
    private req: CustomRequest;
    private res: CustomResponse;
    private next: CustomNextFunction;

    constructor(request: CustomRequest, response: CustomResponse, next: CustomNextFunction) {
        this.req = request;
        this.res = response;
        this.next = next;
    }

    request() {
        return this.req.body;
    }

    response(data: any) {
        this.res.send(data);
    }

    handleError(error: Error) {
        console.log(`Error in ${this.constructor.name} class: ${error.message}`);

        return this.response(_createError(error));
        this.next(error);
    }
}
