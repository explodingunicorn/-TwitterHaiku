"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const service = new user_service_1.default();
const routes = express_1.Router();
routes.get('/:id', (req, res) => {
    service.getUserHaikus(req.params.id).then((tweets) => {
        res.status(200).json({ tweets });
    })
        .catch((errors) => {
        console.log(errors);
    });
});
exports.default = routes;
