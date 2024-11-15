// import { ServiceFactory } from '@/services';
// import { SUser } from '@/services/user.service';
import sequelize from '@/configs/database';
import { CompanyModel } from '@/models/company.model';
import { RoleModel } from '@/models/role.model';
import { Request, Response, NextFunction } from 'express';

export class CUser {
    static async test(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.headers);
            const company = new CompanyModel(sequelize, '');
            await company.createSchema('test');
            const role = new RoleModel(sequelize, 'test').initModel();
            await role.sync({ alter: true });
            await role.create({ name: 'role test' });

            res.send('abababababababababa');
        } catch (error) {
            next(error);
        }
    }

    // static async get(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const sUser = ServiceFactory.getService(ServiceFactory.USER, 'tenant');
    //         const user = await sUser.get(Number(req.params?.id));
    //         res.send(user);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
    // static async create(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const sUser = ServiceFactory.getService(ServiceFactory.USER, 'tenant');
    //         if (!(sUser instanceof SUser)) throw new Error('Something wrong!');
    //         const user = await sUser.create(req.body);
    //         res.send(user);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}
