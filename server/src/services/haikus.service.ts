import { Model } from 'mongoose';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import UserInterface from '../interfaces/user';
import Haiku from '../interfaces/haiku';
import twitter from '../helpers/client';
import TextParser from '../helpers/text';

@Injectable()
export class HaikusService {
  textParser = new TextParser();

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly UsersService: UsersService,
    @InjectModel('Haiku') private readonly Haiku: Model<Haiku>,
  ) {}

  async findRecentHaikus(): Promise<any> {
    const haikus = await this.Haiku.aggregate([
      { $sort: { createdOn: -1 } },
      { $limit: 15 },
    ]).then(docs => {
      return docs;
    });
    return { haikus };
  }

  public async findUserHaikus(screenName: string) {
    // Check for a cached user
    const cachedUser = await this.UsersService.getCachedUser(screenName);

    // If the user exists pull the newest tweets, insert any haikus and then grab all of the haikus in the db
    if (cachedUser) {
      console.log('cached user found');
      return this.getExistingUsersHaikus(cachedUser);
    } else {
      return this.getNewUsersHaikus(screenName);
    }
  }

  private async getExistingUsersHaikus(user: UserInterface) {
    const screenName = user.user;
    const tweets = await this.pullTweetsFromTwitter(screenName, {
      id: user.lastTweetId,
      type: 'since',
    });
    if (tweets) {
      await this.findAndInsertHaikus(tweets);
      await this.UsersService.updateUser(user, tweets[0]);
    }
    const haikus = await this.getCachedHaikus(screenName);
    return {
      user,
      haikus,
    };
  }

  private async getNewUsersHaikus(screenName: string) {
    // Grab the users tweets, insert any that are haikus, create a new user in the db
    // Tweets will not exist if the user does not exist
    const tweets = await this.pullTweetsFromTwitter(screenName);

    if (tweets) {
      await this.findAndInsertHaikus(tweets);
      const user = await this.UsersService.createNewUser(tweets[0]);
      const haikus = await this.getCachedHaikus(screenName);
      return {
        user,
        haikus,
      };
    }
    // Return false if the user does not exist
    return false;
  }

  private getCachedHaikus(screenName: String) {
    return this.Haiku.find(
      { authorLower: screenName.toLowerCase() },
      {},
      { sort: { createdOn: -1 } },
    ).then(haikus => {
      return haikus;
    });
  }

  private findAndInsertHaikus(tweets: any[]) {
    if (!tweets.length) {
      return;
    }

    const haikus = this.textParser.findHaikus(tweets);
    return this.Haiku.insertMany(haikus)
      .then(docs => {
        return docs;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  private getTweets(
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

  private async pullTweetsFromTwitter(
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

      //Recursively get more tweets
      return this.pullTweetsFromTwitter(
        screenName,
        { id: tweets[tweets.length - 1].id, type: 'max' },
        allTweets,
      );
    }
    return !allTweets ? tweets : allTweets;
  }

  async aggregateUsersHaikus(screenName: string): Promise<any> {
    screenName = screenName.toLowerCase();
    return this.Haiku.aggregate([
      { $match: { authorLower: screenName } },
      {
        $group: {
          _id: null,
          average: { $avg: '$sentiment' },
          total: { $sum: 1 },
        },
      },
    ])
      .then(res => {
        return res[0];
      })
      .catch(err => {
        return {};
      });
  }
}
