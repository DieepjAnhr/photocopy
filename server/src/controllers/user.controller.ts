import { ServiceFactory } from "@/services";
import { SUser } from "@/services/user.service";
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

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const sUser = ServiceFactory.getService(ServiceFactory.USER, 'tenant');
            if (!(sUser instanceof SUser))
                throw new Error('Something wrong!')
            const user = await sUser.create(req.body)
            res.send(user)
        } catch (error) {
            next(error)
        }
    }
}