import twitter from './client';
import TextParser from '../helpers/text';

class UserService {
    private tweetsAgg: any[] = [];

    //Gets up to 2000 of the user's last tweetssss
    public getUserHaikus(screen_name: string) {
        return new Promise ((resolve, reject) => {
            this.pullTweetsFromTwitter(screen_name).then((tweets) => {
                const haikus = new TextParser(this.tweetsAgg).findHaikus();
                resolve(haikus);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    private pullTweetsFromTwitter(screen_name: string, last_id?: number) {
        let url: string = 'statuses/user_timeline';
        let params: any = { screen_name, count: 200 };
        
        if (last_id) {
            params.max_id = last_id;
        }

        //Return a new promise
        return new Promise((resolve, reject) => {
            twitter.get(url, params).then((tweets) => {
                //Make sure that the tweets exist from the query
                if (tweets.length > 1 && this.tweetsAgg.length < 10) {
                    //Recursively get more tweets
                    this.pullTweetsFromTwitter(screen_name, tweets[tweets.length - 1].id).then((agg) => {
                        this.tweetsAgg = this.tweetsAgg.concat(tweets);
                        resolve(this.tweetsAgg);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
                else {
                    resolve(this.tweetsAgg);
                }
            })
            .catch((error) => {
                console.log('error getting tweets');
                reject('error getting tweets');
            })
        });
    }
}

export default UserService;