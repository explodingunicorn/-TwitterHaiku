import { Model } from 'mongoose';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HaikusService } from './haikus.service';
import User from '../interfaces/user';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => HaikusService))
    private readonly haikusService: HaikusService,
    @InjectModel('User') private readonly User: Model<User>,
  ) { }

  getCachedUser(screen_name: string) {
    console.log('getting the cached user');
    return this.User.findOne({ userLower: screen_name.toLowerCase() })
      .then(user => {
        return user;
      })
      .catch(err => {
        return err;
      });
  }

  async createNewUser(tweet) {
    console.log('creating a new user');
    const haikuAgg = await this.haikusService.aggregateUsersHaikus(
      tweet.user.screen_name,
    );
    const user: User = {
      user: tweet.user.screen_name,
      userLower: tweet.user.screen_name.toLowerCase(),
      lastTweetId: tweet.id,
      haikus: haikuAgg.total || 0,
      averageHaikuSentiment: haikuAgg.average || 0,
      pic: tweet.user.profile_image_url_https,
    };
    return this.User.create(user)
      .then(user => {
        return user;
      })
      .catch(err => {
        return err;
      });
  }

  async updateUser(user, tweet) {
    if (tweet) {
      console.log(tweet.id)
      const objectToSet: any = {
        lastTweetId: parseInt(tweet.id),
      };
      const haikuAgg = await this.haikusService.aggregateUsersHaikus(
        tweet.user.screen_name,
      );

      console.log(haikuAgg);
      if (haikuAgg.total) {
        objectToSet.haikus = haikuAgg.total;
        objectToSet.averageHaikuSentiment = haikuAgg.average;
      }
      console.log(objectToSet);

      if (tweet && user.lastTweetId != tweet.id) {
        return this.User.findOneAndUpdate(
          { "userLower": user.userLower },
          {
            $set: objectToSet,
          },
        )
          .then(user => {
            console.log('Updated user');
            return user;
          })
          .catch(err => {
            return err;
          });
      }
    }
    return user;
  }
}
