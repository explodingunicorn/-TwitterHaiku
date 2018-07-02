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
const user_1 = require("../models/user");
class UserService {
    //Gets up to 2000 of the user's last tweetssss
    getUserHaikus(screen_name) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check for a cached user
            const cachedUser = yield this.getCachedUser(screen_name);
            // If the user exists pull the newest tweets, insert any haikus and then grab all of the haikus in the db
            if (cachedUser) {
                console.log("cached user found");
                const tweets = yield this.pullTweetsFromTwitter(screen_name, {
                    id: cachedUser.lastTweetId,
                    type: "since"
                });
                if (tweets) {
                    yield this.findAndInsertHaikus(tweets);
                    yield this.updateUser(cachedUser, tweets[0]);
                }
                const haikus = yield this.getCachedHaikus(screen_name);
                return {
                    user: cachedUser,
                    haikus
                };
            }
            else {
                // Grab the users tweets, insert any that are haikus, create a new user in the db
                // Tweets will not exist if the user does not exist
                const tweets = yield this.pullTweetsFromTwitter(screen_name);
                if (tweets) {
                    yield this.findAndInsertHaikus(tweets);
                    const user = yield this.createNewUser(tweets[0]);
                    const haikus = yield this.getCachedHaikus(screen_name);
                    return {
                        user,
                        haikus
                    };
                }
                // Return false if the user does not exist
                return false;
            }
        });
    }
    getCachedHaikus(screen_name) {
        return haiku_1.Haiku.find({ authorLower: screen_name.toLowerCase() }, {}, { sort: { createdOn: -1 } }).then(haikus => {
            return haikus;
        });
    }
    findAndInsertHaikus(tweets) {
        if (!tweets.length) {
            return;
        }
        const haikus = new text_1.default(tweets).findHaikus();
        return haiku_1.Haiku.insertMany(haikus)
            .then(docs => {
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
        if (last_id && last_id.type === "max") {
            params.max_id = last_id.id;
        }
        else if (last_id && last_id.type === "since") {
            params.since_id = last_id.id;
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
                return this.pullTweetsFromTwitter(screen_name, { id: tweets[tweets.length - 1].id, type: "max" }, allTweets);
            }
            else {
                console.log("returning from recursion");
                return allTweets;
            }
        });
    }
    getCachedUser(screen_name) {
        console.log("getting the cached user");
        return user_1.User.findOne({ userLower: screen_name.toLowerCase() })
            .then(user => {
            return user;
        })
            .catch(err => {
            return err;
        });
    }
    createNewUser(tweet) {
        console.log("creating a new user");
        const user = {
            user: tweet.user.screen_name,
            userLower: tweet.user.screen_name.toLowerCase(),
            lastTweetId: tweet.id
        };
        return user_1.User.create(user)
            .then(user => {
            return user;
        })
            .catch(err => {
            return err;
        });
    }
    updateUser(user, tweet) {
        console.log("updating user with latest tweet", tweet);
        if (tweet) {
            return user_1.User.findByIdAndUpdate(user._id, {
                $set: { lastTweetId: tweet.id }
            })
                .then(user => {
                return user;
            })
                .catch(err => {
                return err;
            });
        }
        return user;
    }
}
exports.default = UserService;
