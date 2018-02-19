"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const text_1 = require("../helpers/text");
class UserService {
    constructor() {
        this.tweetsAgg = [];
    }
    //Gets up to 2000 of the user's last tweetssss
    getUserHaikus(screen_name) {
        return new Promise((resolve, reject) => {
            this.pullTweetsFromTwitter(screen_name).then((tweets) => {
                const haikus = new text_1.default(this.tweetsAgg).findHaikus();
                resolve(haikus);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    pullTweetsFromTwitter(screen_name, last_id) {
        let url = 'statuses/user_timeline';
        let params = { screen_name, count: 200 };
        if (last_id) {
            params.max_id = last_id;
        }
        //Return a new promise
        return new Promise((resolve, reject) => {
            client_1.default.get(url, params).then((tweets) => {
                //Make sure that the tweets exist from the query
                if (tweets.length > 1 && this.tweetsAgg.length < 10) {
                    //Recursively get more tweets
                    this.pullTweetsFromTwitter(screen_name, tweets[tweets.length - 1].id).then((agg) => {
                        this.tweetsAgg = this.tweetsAgg.concat(tweets);
                        resolve(this.tweetsAgg);
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                else {
                    resolve(this.tweetsAgg);
                }
            })
                .catch((error) => {
                console.log('error getting tweets');
                reject('error getting tweets');
            });
        });
    }
}
exports.default = UserService;
