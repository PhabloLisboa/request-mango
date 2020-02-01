"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./server/main");
const group_controller_1 = require("./controllers/Group/group.controller");
const sub_controller_1 = require("./controllers/Sub/sub.controller");
const router_1 = require("./routes/router");
const server = new main_1.Server();
server.bootstrap(...group_controller_1.groupController.router, ...sub_controller_1.subController.router, router_1.auth).then(app => console.log(`Server Is running`));
