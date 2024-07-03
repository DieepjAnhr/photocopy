"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelFactory = void 0;
const user_model_1 = require("./user.model");
const category_model_1 = require("./category.model");
class ModelFactory {
    static USER = 'user';
    static CATEGORY = 'category';
    static getModel(modelName, tenant) {
        switch (modelName) {
            case this.USER:
                return this.getUserModel(tenant);
            case this.CATEGORY:
                return this.getCategoryModel(tenant);
            default:
                throw new Error(`Model ${modelName} not supported!`);
        }
    }
    static getUserModel(tenant) {
        return user_model_1.MUser.schema(tenant);
    }
    static getCategoryModel(tenant) {
        return category_model_1.MCategory.schema(tenant);
    }
}
exports.ModelFactory = ModelFactory;
//# sourceMappingURL=index.js.map