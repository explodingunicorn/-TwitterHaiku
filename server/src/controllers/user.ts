import { Router } from "express";
import UserService from "../services/user.service";

const service = new UserService();
const routes = Router();

routes.get("/:id", async (req, res) => {
  const user = await service.getUserHaikus(req.params.id);
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401);
  }
});

export default routes;
