"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUser = void 0;
class SUser {
    rUser;
    setDependency({ user }) {
        this.rUser = user;
    }
    async get(id) {
        return await this.rUser.findById(id);
    }
}
exports.SUser = SUser;
//# sourceMappingURL=user.service.js.map