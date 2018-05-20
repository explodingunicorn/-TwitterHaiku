import { Router } from "express";
import UserService from "../services/user.service";

const service = new UserService();
const routes = Router();

routes.get("/:id", async (req, res) => {
  const tweets = await service.getUserHaikus(req.params.id);
  if (tweets) {
    res.status(200).json({ tweets });
  } else {
    res.status(401);
  }
});

export default routes;