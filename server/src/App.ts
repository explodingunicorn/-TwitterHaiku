import * as express from 'express';
import routes from './controllers';

class App {
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.express.use('/user', routes.user);
    this.express.use('/trend', routes.trend);
  }
}

export default new App().express