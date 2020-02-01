"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth/auth.controller");
exports.auth = {
    method: 'post',
    path: '/auth',
    callback: auth_controller_1.authenticate
};
