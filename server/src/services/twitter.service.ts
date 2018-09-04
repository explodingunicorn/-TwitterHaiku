import { Injectable } from '@nestjs/common';
import twitter from '../helpers/client';

@Injectable()
export class TwitterService {
  constructor() { }

  getTestTweets() {
    return twitter.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 200, since_id: 1037110455263785000 })
      .then(res => {
        return res;
      })
  }

  getTweets(
    screenName: string,
    last_id?: { id: number; type: string },
  ) {
    let url: string = 'statuses/user_timeline';
    let params: any = { screen_name: screenName, count: 200 };

    if (last_id && last_id.type === 'max') {
      params.max_id = last_id.id;
    } else if (last_id && last_id.type === 'since') {
      params.since_id = last_id.id;
    }

    return twitter
      .get(url, params)
      .then(tweets => {
        return tweets;
      })
      .catch(err => {
        console.log('Error getting tweets');
        return;
      });
  }

  async pullTweets(
    screenName: string,
    last_id?: { id: number; type: string },
    allTweets?: any[],
  ) {
    const tweets = await this.getTweets(screenName, last_id);
    if (tweets.length > 1) {
      if (!allTweets) {
        allTweets = tweets;
      } else {
        allTweets = allTweets.concat(tweets);
      }

      const since = last_id && last_id.type === 'since';

      //Recursively get more tweets
      return this.pullTweets(
        screenName,
        { id: since ? tweets[0].id : tweets[tweets.length - 1].id, type: since ? 'since' : 'max' },
        allTweets,
      );
    }
    return !allTweets ? tweets : allTweets;
  }
}