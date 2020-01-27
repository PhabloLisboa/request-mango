"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const environment_1 = require("../common/environment");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
class Server {
    initializeDB() {
        return mongoose.connect(environment_1.environment.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log('DB INITIALIZED!'));
    }
    initRoutes(app, routeObjects) {
        return new Promise((resolve, reject) => {
            try {
                routeObjects.forEach(route => {
                    app[route.method](route.path, route.callback);
                });
                app.listen(environment_1.environment.server.port, () => resolve(app));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    bootstrap(...routeObjects) {
        this.app = express();
        this.app.use(bodyParser.json());
        return this.initializeDB()
            .then(() => this.initRoutes(this.app, routeObjects));
    }
}
exports.Server = Server;
