"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sentiment = require("sentiment");
const moment = require("moment");
const haikuChecker_1 = require("./haikuChecker");
const monthDict = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
};
class TextParser {
    constructor(tweets) {
        this.haikus = [];
        this.tweets = tweets;
    }
    findHaikus() {
        for (let i = 0; i < this.tweets.length; i++) {
            const parsedTweet = this.parseTweet(this.tweets[i].text);
            const haiku = this.checkForHaiku(parsedTweet, this.tweets[i]);
            if (haiku) {
                this.haikus.unshift(haiku);
            }
        }
        return this.haikus;
    }
    parseTweet(tweet) {
        if (tweet.includes("RT ")) {
            return null;
        }
        tweet = tweet
            .replace(/(@\S+)/gi, "")
            .replace(/(http\S+)/, "")
            .replace(/(#\S+)/, "")
            .replace(/[.,\/#!$%\^&\*\";:{}=\-_`~()\u2014\u2013]/g, "")
            .replace(/\s{2,}/g, " ");
        return tweet;
    }
    checkForHaiku(tweet, fullTweetInfo) {
        if (!tweet) {
            return;
        }
        //Check if the tweet is a haiku
        const possibleHaiku = new haikuChecker_1.default(tweet).check();
        //If the tweet was a haiku return it as a Haiku object
        if (possibleHaiku) {
            let parsedDate = fullTweetInfo.created_at.split(" ");
            let formattedDate = monthDict[parsedDate[1]] + "/" + parsedDate[2] + "/" + parsedDate[5];
            return {
                author: fullTweetInfo.user.screen_name,
                authorLower: fullTweetInfo.user.screen_name.toLowerCase(),
                authorId: fullTweetInfo.user.id,
                authorImgLink: fullTweetInfo.user.profile_image_url_https,
                authorUrl: fullTweetInfo.user.url,
                createdOn: moment(fullTweetInfo.created_at).toDate(),
                formattedDate,
                haiku: possibleHaiku.split,
                tweetId: fullTweetInfo.id,
                tweetUrl: fullTweetInfo.entities.urls.url,
                retweets: fullTweetInfo.retweet_count,
                favorites: fullTweetInfo.favorite_count,
                sentiment: sentiment(possibleHaiku.haiku),
                date: moment().toDate()
            };
        }
        return;
    }
}
exports.default = TextParser;
