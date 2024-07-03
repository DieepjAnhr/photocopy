"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
const create_error_1 = require("./utils/create-error");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use('', routers_1.default);
app.use((req, res, next) => {
    req;
    res;
    const error = new Error('400 ~ Endpoint is not exist!');
    next(error);
});
app.use((err, req, res, next) => {
    req;
    console.log(err);
    const response = (0, create_error_1._createError)(err);
    return res.send(response);
    next();
});
exports.default = app;
//# sourceMappingURL=app.js.map