"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./server/main");
const group_controller_1 = require("./controllers/Group/group.controller");
const server = new main_1.Server();
server.bootstrap(...group_controller_1.groupController.router).then(app => console.log(`Server Is running`));
