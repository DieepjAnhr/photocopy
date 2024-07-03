"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUser = void 0;
const services_1 = require("@/services");
class CUser {
    static async get(req, res, next) {
        try {
            const sUser = services_1.ServiceFactory.getService(services_1.ServiceFactory.USER, 'tenant');
            const user = await sUser.get(Number(req.params?.id));
            res.send(user);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CUser = CUser;
//# sourceMappingURL=user.controller.js.map