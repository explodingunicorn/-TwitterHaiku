"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Twitter = require("twitter");
const secret_1 = require("./secret");
var client = new Twitter(secret_1.default);
exports.default = client;
