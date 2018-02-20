interface Haiku {
    author: string,
    authorId: number,
    authorImgLink: string,
    authorUrl: string,
    date: string,
    haiku: string[],
    tweetId: number,
    tweetUrl: string,
    retweets: number,
    favorites: number,
    sentiment: number
}

export default Haiku;