import * as Twitter from 'twitter';
import secret from './secret';

var client = new Twitter(secret);

export default client;