import { Router } from "express";
import { drugsController } from "../controllers/drugsController";

export const drugsRouter = Router();

drugsRouter.post("/", drugsController.create);
drugsRouter.get("/", drugsController.get);
drugsRouter.put("/", drugsController.update);
drugsRouter.delete("/", drugsController.delete);
