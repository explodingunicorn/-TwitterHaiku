import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Haiku } from './models/haiku';
import { User } from './models/user';

import { HaikusController } from './controllers/haikus.controller';
import { HaikusService, UsersService, TwitterService } from './services';

if (!process.env.NODE_ENV) {
  require('dotenv').load();
}

function getMongoUrl(): string {
  return `mongodb://${process.env.mlabUser}:${process.env.mlabPassword}${
    process.env.NODE_ENV === 'prod'
      ? '@ds141952.mlab.com:41952/twitterhaiku'
      : '@ds141942.mlab.com:41942/twitterhaiku-dev'
    }`;
}

@Module({
  imports: [
    MongooseModule.forRoot(getMongoUrl()),
    MongooseModule.forFeature([
      { name: 'Haiku', schema: Haiku },
      { name: 'User', schema: User },
    ]),
  ],
  controllers: [AppController, HaikusController],
  providers: [AppService, HaikusService, UsersService, TwitterService],
})
export class AppModule { }
