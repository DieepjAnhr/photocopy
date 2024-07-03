"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("@/controllers/user.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/user/:id').get(user_controller_1.CUser.get);
exports.default = router;
//# sourceMappingURL=index.js.map