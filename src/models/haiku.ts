import { Schema } from 'mongoose';

export const Haiku = new Schema({
  author: String,
  authorLower: String,
  authorId: Number,
  authorImgLink: String,
  authorUrl: String,
  createdOn: Date,
  formattedDate: String,
  haiku: [String],
  tweetId: Number,
  tweetUrl: String,
  retweets: Number,
  favorites: Number,
  sentiment: Object,
  date: Date,
});

Haiku.pre('insertMany', function(next) {
  let now = Date();
  this.date = now;
  next();
});
