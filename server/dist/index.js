"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("module-alias/register");
const constant_1 = require("./configs/constant");
const app_1 = __importDefault(require("./app"));
try {
    const server = http_1.default.createServer(app_1.default);
    server.listen(constant_1.APPLICATION.port, () => (console.log(`Server runing at http://${constant_1.APPLICATION.host}:${constant_1.APPLICATION.port}/`)));
}
catch (err) {
    console.log(err);
}
//# sourceMappingURL=index.js.map