import { Router } from "express";
import { drugsController } from "../controllers/drugsController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const drugsRouter = Router();

drugsRouter.post("/", authMiddleware, drugsController.create);
drugsRouter.get("/", authMiddleware, drugsController.get);
drugsRouter.put("/", authMiddleware, drugsController.update);
drugsRouter.delete("/", authMiddleware, drugsController.delete);
