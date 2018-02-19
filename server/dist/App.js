"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = require("./controllers");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        this.express.use('/user', controllers_1.default.user);
        this.express.use('/trend', controllers_1.default.trend);
    }
}
exports.default = new App().express;
