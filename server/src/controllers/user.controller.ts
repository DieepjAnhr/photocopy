import { ServiceFactory } from "@/services";
import { Request, Response, NextFunction } from "express";

export class CUser {
    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const sUser = ServiceFactory.getService(ServiceFactory.USER, 'tenant');
            const user = await sUser.get(Number(req.params?.id))
            res.send(user)
        } catch (error) {
            next(error)
        }
    }
}