import { EResponseStatus } from '../enums/response-status';

export interface IResponse<T> {
    status: EResponseStatus;
    code: number;
    message: string;
    errors?: string[];
    access_token?: string;
    refresh_token?: string;
    count?: number;
    data?: T;
}
