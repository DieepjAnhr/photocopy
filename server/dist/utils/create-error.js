"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._createError = void 0;
const response_status_1 = require("@/common/enums/response-status");
const _createError = (error) => {
    const errorMessage = error.message;
    const errorArray = errorMessage.split(' ~ ');
    const code = !isNaN(Number(errorArray[0])) ? Number(errorArray[0]) : 500;
    const message = errorArray[1] ? errorArray[1] : errorArray[0];
    const result = { status: response_status_1.EResponseStatus.error, code: code, message: message };
    return result;
};
exports._createError = _createError;
//# sourceMappingURL=create-error.js.map