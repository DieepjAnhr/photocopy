import { BaseController } from '@/common/base/controller.base';
import { CustomNextFunction, CustomRequest, CustomResponse } from '@/common/interfaces/custom-express';

export class CUser extends BaseController {
    constructor(request: CustomRequest, response: CustomResponse, next: CustomNextFunction) {
        super(request, response, next);
    }

    async get() {
        try {
            throw new Error('test test test');
            return this.response({ hello: 'hello hello' });
        } catch (error) {
            this.handleError(error);
        }
    }

    async detail() {
        try {
        } catch (error) {
            this.handleError(error);
        }
    }

    async create() {
        try {
        } catch (error) {
            this.handleError(error);
        }
    }

    async update() {
        try {
        } catch (error) {
            this.handleError(error);
        }
    }

    async delete() {
        try {
        } catch (error) {
            this.handleError(error);
        }
    }
}
