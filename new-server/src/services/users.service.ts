import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import User from '../interfaces/user';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly User: Model<User>) {}

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

  createNewUser(tweet) {
    console.log('creating a new user');
    const user = {
      user: tweet.user.screen_name,
      userLower: tweet.user.screen_name.toLowerCase(),
      lastTweetId: tweet.id,
    };
    return this.User.create(user)
      .then(user => {
        return user;
      })
      .catch(err => {
        return err;
      });
  }

  updateUser(user, tweet) {
    console.log('updating user with latest tweet', tweet);
    if (tweet) {
      return this.User.findOneAndUpdate(
        { user: user._id },
        {
          $set: { lastTweetId: tweet.id },
        },
      )
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
