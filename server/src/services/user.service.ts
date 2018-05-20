import twitter from "./client";
import TextParser from "../helpers/text";
import { Haiku } from "../models/haiku";

class UserService {
  //Gets up to 2000 of the user's last tweetssss
  public async getUserHaikus(screen_name: string) {
    const cachedHaikus = await this.checkCachedHaikus(screen_name);
    if (cachedHaikus.length) {
      console.log(cachedHaikus[0].createdOn);
      console.log("found cached haikus");
      const tweets = await this.pullTweetsFromTwitter(
        screen_name,
        cachedHaikus[0].tweetId
      );
      await this.findAndInsertHaikus(tweets, cachedHaikus);
      return this.checkCachedHaikus(screen_name);
    } else {
      const tweets = await this.pullTweetsFromTwitter(screen_name);
      await this.findAndInsertHaikus(tweets);
      return this.checkCachedHaikus(screen_name);
    }
  }

  private checkCachedHaikus(screen_name: string) {
    return Haiku.find(
      { authorLower: screen_name.toLowerCase() },
      {},
      { sort: { createdOn: -1 } }
    ).then(haikus => {
      return haikus;
    });
  }

  private findAndInsertHaikus(tweets: any[], cachedHaikus?: any[]) {
    if (!tweets && cachedHaikus) {
      console.log("returning cached haikus");
      return cachedHaikus;
    } else if (!tweets && !cachedHaikus) {
      console.log("User has no haikus");
      return false;
    }

    const haikus = new TextParser(tweets).findHaikus();
    return Haiku.insertMany(haikus)
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

  private getTweets(screen_name: string, last_id?: number) {
    console.log("getting tweets");
    let url: string = "statuses/user_timeline";
    let params: any = { screen_name, count: 200 };

    if (last_id) {
      params.max_id = last_id;
    }

    return twitter
      .get(url, params)
      .then(tweets => {
        return tweets;
      })
      .catch(err => {
        console.log("Error getting tweets");
        return;
      });
  }

  private async pullTweetsFromTwitter(
    screen_name: string,
    last_id?: number,
    allTweets?: any[]
  ) {
    const tweets = await this.getTweets(screen_name, last_id);
    if (tweets.length > 1) {
      console.log("recursing");
      if (!allTweets) {
        allTweets = tweets;
      } else {
        allTweets = allTweets.concat(tweets);
      }

      //Recursively get more tweets
      return this.pullTweetsFromTwitter(
        screen_name,
        tweets[tweets.length - 1].id,
        allTweets
      );
    } else {
      console.log("returning from recursion");
      return allTweets;
    }
  }
}

export default UserService;
