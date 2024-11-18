import { Request, Response, NextFunction } from 'express';

interface ITokenData {
    user_id: number;
    tenant: string;
}

export interface CustomRequest extends Request {
    token?: ITokenData;
}

export interface CustomResponse extends Response {}

export interface CustomNextFunction extends NextFunction {}
