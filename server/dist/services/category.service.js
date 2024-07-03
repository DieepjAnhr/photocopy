"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCategory = void 0;
class SCategory {
    rCategory;
    setDependency({ category }) {
        this.rCategory = category;
    }
    async get(id) {
        return await this.rCategory.findById(id);
    }
}
exports.SCategory = SCategory;
//# sourceMappingURL=category.service.js.map