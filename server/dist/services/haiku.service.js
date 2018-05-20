"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const haiku_1 = require("../models/haiku");
class HaikuService {
    getAllHaikus() {
        return haiku_1.Haiku.aggregate([{ $sort: { date: -1 } }]).then(docs => {
            return docs;
        });
    }
}
exports.default = HaikuService;
