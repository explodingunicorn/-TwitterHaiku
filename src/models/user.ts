import { Schema, Model, model } from 'mongoose';

export const User = new Schema({
  user: String,
  userLower: String,
  lastTweetId: Number,
  haikus: Number,
  averageHaikuSentiment: Number,
  pic: String,
});
