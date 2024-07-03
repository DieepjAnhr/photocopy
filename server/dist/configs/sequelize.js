"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = require("@/models/category.model");
const user_model_1 = require("@/models/user.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'your_database',
    dialect: 'postgres',
    username: 'root',
    password: '',
    host: 'localhost',
    port: 5432,
    models: [user_model_1.MUser, category_model_1.MCategory],
});
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map