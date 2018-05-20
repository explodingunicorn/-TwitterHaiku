import * as express from "express";
import * as mongoose from "mongoose";
import routes from "./controllers";

const mongoDB = "mongodb://localhost:27017";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

class App {
  public express;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.express.use("/user", routes.user);
    this.express.use("/trend", routes.trend);
    this.express.use("/haiku", routes.haiku);
  }
}

export default new App().express;
