import { EResponseStatus } from "./enums/response-status";

class CustomError extends Error {
    protected httpCode: number;
    protected status: EResponseStatus;

    constructor(httpCode: number, status: EResponseStatus, message: string) {
        super(message);
        this.httpCode = httpCode;
        this.status = status
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(404, EResponseStatus.failure, message);
    }
}

export class InternalServerError extends CustomError {
    constructor(message: string) {
        super(500, EResponseStatus.failure, message);
    }
}