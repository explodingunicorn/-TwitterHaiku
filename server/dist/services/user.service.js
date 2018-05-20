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
const client_1 = require("./client");
const text_1 = require("../helpers/text");
const haiku_1 = require("../models/haiku");
class UserService {
    //Gets up to 2000 of the user's last tweetssss
    getUserHaikus(screen_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedHaikus = yield this.checkCachedHaikus(screen_name);
            if (cachedHaikus.length) {
                console.log(cachedHaikus[0].createdOn);
                console.log("found cached haikus");
                const tweets = yield this.pullTweetsFromTwitter(screen_name, cachedHaikus[0].tweetId);
                yield this.findAndInsertHaikus(tweets, cachedHaikus);
                return this.checkCachedHaikus(screen_name);
            }
            else {
                const tweets = yield this.pullTweetsFromTwitter(screen_name);
                yield this.findAndInsertHaikus(tweets);
                return this.checkCachedHaikus(screen_name);
            }
        });
    }
    checkCachedHaikus(screen_name) {
        return haiku_1.Haiku.find({ authorLower: screen_name.toLowerCase() }, {}, { sort: { createdOn: -1 } }).then(haikus => {
            return haikus;
        });
    }
    findAndInsertHaikus(tweets, cachedHaikus) {
        if (!tweets && cachedHaikus) {
            console.log("returning cached haikus");
            return cachedHaikus;
        }
        else if (!tweets && !cachedHaikus) {
            console.log("User has no haikus");
            return false;
        }
        const haikus = new text_1.default(tweets).findHaikus();
        return haiku_1.Haiku.insertMany(haikus)
            .then(docs => {
            if (cachedHaikus) {
                return docs.concat(cachedHaikus);
            }
            return docs;
        })
            .catch(err => {
            console.log(err);
            return err;
        });
    }
    getTweets(screen_name, last_id) {
        console.log("getting tweets");
        let url = "statuses/user_timeline";
        let params = { screen_name, count: 200 };
        if (last_id) {
            params.max_id = last_id;
        }
        return client_1.default
            .get(url, params)
            .then(tweets => {
            return tweets;
        })
            .catch(err => {
            console.log("Error getting tweets");
            return;
        });
    }
    pullTweetsFromTwitter(screen_name, last_id, allTweets) {
        return __awaiter(this, void 0, void 0, function* () {
            const tweets = yield this.getTweets(screen_name, last_id);
            if (tweets.length > 1) {
                console.log("recursing");
                if (!allTweets) {
                    allTweets = tweets;
                }
                else {
                    allTweets = allTweets.concat(tweets);
                }
                //Recursively get more tweets
                return this.pullTweetsFromTwitter(screen_name, tweets[tweets.length - 1].id, allTweets);
            }
            else {
                console.log("returning from recursion");
                return allTweets;
            }
        });
    }
}
exports.default = UserService;
