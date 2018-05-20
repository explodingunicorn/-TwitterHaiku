"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const haiku_service_1 = require("../services/haiku.service");
const service = new haiku_service_1.default();
const routes = express_1.Router();
routes.get("/", (req, res) => {
    service
        .getAllHaikus()
        .then(haikus => {
        res.status(200).json({ haikus });
    })
        .catch(errors => {
        console.log(errors);
    });
});
exports.default = routes;
