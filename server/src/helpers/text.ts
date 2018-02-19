import * as rita from 'rita';
import * as sentiment from 'sentiment';
import Haiku from '../interfaces/haiku';

class HaikuChecker {
    private textArray: string[];
    private haikuSplit: string[] = [];
    private haiku: string = '';
    
    constructor(text: string) {
        const trimmedText = new rita.RiString(text).trim()._text;
        this.textArray = trimmedText.split(' ');
    }

    public check() {
        //Check that the tweet is atleast 3 words long
        if (this.textArray.length > 2) {
            //Now check for all of the syllables needed for a haiku
            if (this.checkForSyllables(5)) {
                if (this.checkForSyllables(7)) {
                    if (this.checkForSyllables(5)) {
                        if (this.textArray.length === 0) {
                            return { 
                                split: this.haikuSplit,
                                haiku: this.haiku
                            }
                        }
                        return;
                    }
                    return;
                }
                return;
            }
            return;
        }
        return;
    }

    private checkForSyllables(syllables: number) {
        let syllableCount = 0;
        let sentence = '';
        let wordCount = 0;
        for (let i = 0; i < this.textArray.length; i++) {
            const word = this.textArray[i];
            //Add syllables of the word to the syllable count
            syllableCount += rita.getSyllables(word.replace("'", '')).split('/').length;
            //Shift the text array removing the word
            //Add the word to the sentence
            sentence += (word + ' ');
            wordCount++;

            //If we have successfully hit our syllable count then push the sentence to our haiku split
            if (syllableCount === syllables) {
                this.haikuSplit.push(sentence);
                this.haiku += sentence;
                //Remove the words that we just counted
                this.textArray.splice(0, wordCount);
                return true;
            }
            //If we have gone over our syllable count with a single word than this tweet can no longer be a haiku
            else if (syllableCount > syllables) {
                return false;
            }
        }
    }
}

class TextParser {
    private tweets;
    private haikus: Haiku[] = [];

    constructor(tweets: any[]) {
        this.tweets = tweets;
    }

    public findHaikus(): Haiku[] {
        for (let i = 0; i < this.tweets.length; i++) {
            const parsedTweet = this.parseTweet(this.tweets[i].text);
            const haiku = this.checkForHaiku(parsedTweet, this.tweets[i]);
            if (haiku) {
                this.haikus.unshift(haiku);
            }
        }

        return this.haikus;
    }

    private parseTweet(tweet: string):string | null {
        if (tweet.includes('RT')) {
            return null;
        }
        tweet = tweet.replace(/(@\S+)/gi, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').replace(/\s{2,}/g," ");
        return tweet;
    }

    private checkForHaiku(tweet: string, fullTweetInfo: any): Haiku | null {
        if (!tweet) {
            return;
        }
        
        //Check if the tweet is a haiku
        const possibleHaiku = new HaikuChecker(tweet).check();

        //If the tweet was a haiku return it as a Haiku object
        if (possibleHaiku) {
            return {
                author: fullTweetInfo.user.screen_name,
                haiku: possibleHaiku.split,
                tweetId: fullTweetInfo.id,
                sentiment: sentiment(possibleHaiku.haiku)
            }
        }
        else {
            return;
        }
        
    }
}

export default TextParser;