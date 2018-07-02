import { Schema, Model, model } from "mongoose";

const UserSchema = new Schema({
  user: String,
  userLower: String,
  lastTweetId: Number
});

export const User: Model = model("User", UserSchema);
