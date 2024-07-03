"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCategory = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
let MCategory = class MCategory extends sequelize_typescript_1.Model {
    name;
    creatorId;
    creator;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }),
    __metadata("design:type", String)
], MCategory.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.MUser),
    (0, sequelize_typescript_1.Column)({
        allowNull: false
    }),
    __metadata("design:type", Number)
], MCategory.prototype, "creatorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.MUser),
    __metadata("design:type", user_model_1.MUser)
], MCategory.prototype, "creator", void 0);
MCategory = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true })
], MCategory);
exports.MCategory = MCategory;
//# sourceMappingURL=category.model.js.map