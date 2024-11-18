import { Request } from 'express';

class Auth {
    private request: Request;

    constructor(request: Request) {
        this.request = request;
    }

    async authenticate() {
        const { headers } = this.request;
        const token = headers.authorization;
        return token;
    }
}
