import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Haiku } from './models/haiku';
import { User } from './models/user';

import { HaikusController } from './controllers/haikus.controller';
import { HaikusService, UsersService } from './services';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    MongooseModule.forFeature([
      { name: 'Haiku', schema: Haiku },
      { name: 'User', schema: User },
    ]),
  ],
  controllers: [AppController, HaikusController],
  providers: [AppService, HaikusService, UsersService],
})
export class AppModule {}
