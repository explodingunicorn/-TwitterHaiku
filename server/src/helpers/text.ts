import * as sentiment from "sentiment";
import * as moment from "moment";
import Haiku from "../interfaces/haiku";
import HaikuChecker from "./haikuChecker";

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
  private tweets: any[];
  private haikus: Haiku[] = [];

  constructor(tweets: any[]) {
    this.tweets = tweets;
  }

  public findHaikus(): Haiku[] {
    for (let i = 0; i < this.tweets.length; i++) {
      const parsedTweet = this.parseTweet(this.tweets[i].text);
      const haiku = this.checkForHaiku(parsedTweet, this.tweets[i]);
      if (haiku) {
        this.haikus.unshift(haiku);
      }
    }

    return this.haikus;
  }

  private parseTweet(tweet: string): string | null {
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

  private checkForHaiku(tweet: string, fullTweetInfo: any): Haiku | null {
    if (!tweet) {
      return;
    }

    //Check if the tweet is a haiku
    const possibleHaiku = new HaikuChecker(tweet).check();

    //If the tweet was a haiku return it as a Haiku object
    if (possibleHaiku) {
      let parsedDate = fullTweetInfo.created_at.split(" ");
      let formattedDate =
        monthDict[parsedDate[1]] + "/" + parsedDate[2] + "/" + parsedDate[5];

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

export default TextParser;
