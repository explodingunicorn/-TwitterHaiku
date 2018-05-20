"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HaikuSchema = new mongoose_1.Schema({
    author: String,
    authorLower: String,
    authorId: Number,
    authorImgLink: String,
    authorUrl: String,
    createdOn: Date,
    formattedDate: String,
    haiku: [String],
    tweetId: Number,
    tweetUrl: String,
    retweets: Number,
    favorites: Number,
    sentiment: Object,
    date: Date
});
HaikuSchema.pre("insertMany", function (next) {
    let now = Date();
    this.date = now;
    next();
});
exports.Haiku = mongoose_1.model("Haiku", HaikuSchema);
