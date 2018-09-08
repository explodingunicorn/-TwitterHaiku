interface Haiku {
  author: string;
  authorLower: string;
  authorId: number;
  authorImgLink: string;
  authorUrl: string;
  createdOn: Date;
  formattedDate: string;
  haiku: string[];
  tweetId: number;
  tweetUrl: string;
  retweets: number;
  favorites: number;
  sentiment: number;
  date: Date;
}

export default Haiku;
