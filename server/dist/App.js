"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const controllers_1 = require("./controllers");
const mongoDB = "mongodb://localhost:27017";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        this.express.use("/user", controllers_1.default.user);
        this.express.use("/trend", controllers_1.default.trend);
        this.express.use("/haiku", controllers_1.default.haiku);
    }
}
exports.default = new App().express;
