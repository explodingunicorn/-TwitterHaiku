import { Router } from "express";
import HaikuService from "../services/haiku.service";

const service = new HaikuService();
const routes = Router();

routes.get("/", (req, res) => {
  service
    .getAllHaikus()
    .then(haikus => {
      res.status(200).json({ haikus });
    })
    .catch(errors => {
      console.log(errors);
    });
});

export default routes;
