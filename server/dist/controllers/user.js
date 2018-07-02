"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const service = new user_service_1.default();
const routes = express_1.Router();
routes.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield service.getUserHaikus(req.params.id);
    if (user) {
        res.status(200).json({ user });
    }
    else {
        res.status(401);
    }
}));
exports.default = routes;
