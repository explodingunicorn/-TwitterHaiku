import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import Haiku from '../interfaces/haiku';
import twitter from '../helpers/client';
import TextParser from '../helpers/text';

@Injectable()
export class HaikusService {
  textParser = new TextParser();

  constructor(
    @InjectModel('Haiku') private readonly Haiku: Model<Haiku>,
    private readonly UsersService: UsersService,
  ) {}

  async findRecentHaikus(): Promise<any> {
    const haikus = await this.Haiku.aggregate([{ $sort: { date: -1 } }]).then(
      docs => {
        return docs;
      },
    );
    return { haikus };
  }

  public async findUserHaikus(screen_name: string) {
    // Check for a cached user
    const cachedUser = await this.UsersService.getCachedUser(screen_name);

    // If the user exists pull the newest tweets, insert any haikus and then grab all of the haikus in the db
    if (cachedUser) {
      console.log('cached user found');
      const tweets = await this.pullTweetsFromTwitter(screen_name, {
        id: cachedUser.lastTweetId,
        type: 'since',
      });
      if (tweets) {
        await this.findAndInsertHaikus(tweets);
        await this.UsersService.updateUser(cachedUser, tweets[0]);
      }
      const haikus = await this.getCachedHaikus(screen_name);
      return {
        user: cachedUser,
        haikus,
      };
    } else {
      // Grab the users tweets, insert any that are haikus, create a new user in the db
      // Tweets will not exist if the user does not exist
      const tweets = await this.pullTweetsFromTwitter(screen_name);

      if (tweets) {
        await this.findAndInsertHaikus(tweets);
        const user = await this.UsersService.createNewUser(tweets[0]);
        const haikus = await this.getCachedHaikus(screen_name);
        return {
          user,
          haikus,
        };
      }
      // Return false if the user does not exist
      return false;
    }
  }

  private getCachedHaikus(screen_name: string) {
    return this.Haiku.find(
      { authorLower: screen_name.toLowerCase() },
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
    screen_name: string,
    last_id?: { id: number; type: string },
  ) {
    console.log('getting tweets');
    let url: string = 'statuses/user_timeline';
    let params: any = { screen_name, count: 200 };

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
    screen_name: string,
    last_id?: { id: number; type: string },
    allTweets?: any[],
  ) {
    const tweets = await this.getTweets(screen_name, last_id);
    if (tweets.length > 1) {
      console.log('recursing');
      if (!allTweets) {
        allTweets = tweets;
      } else {
        allTweets = allTweets.concat(tweets);
      }

      //Recursively get more tweets
      return this.pullTweetsFromTwitter(
        screen_name,
        { id: tweets[tweets.length - 1].id, type: 'max' },
        allTweets,
      );
    } else {
      console.log('returning from recursion');
      return allTweets;
    }
  }
}
