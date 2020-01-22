"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./server/main");
const server = new main_1.Server();
server.bootstrap().then(app => console.log(`Server Is running`));
