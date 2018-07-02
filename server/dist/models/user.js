"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    user: String,
    userLower: String,
    lastTweetId: Number
});
exports.User = mongoose_1.model("User", UserSchema);
