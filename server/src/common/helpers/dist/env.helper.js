"use strict";
exports.__esModule = true;
exports.getEnvPath = void 0;
var path_1 = require("path");
function getEnvPath(dest) {
    var env = process.env.NODE_ENV;
    var filename = env ? "." + env + ".env" : '.development.env';
    return path_1.resolve(dest + "/" + filename);
}
exports.getEnvPath = getEnvPath;
