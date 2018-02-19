"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require('express').Router();
routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Current Trends' });
});
exports.default = routes;
