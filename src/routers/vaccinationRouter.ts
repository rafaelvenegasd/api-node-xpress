import { Router } from "express";
import { vaccinationController } from "../controllers/vaccinationController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const vaccinationRouter = Router();

vaccinationRouter.post("/", authMiddleware, vaccinationController.create);
vaccinationRouter.get("/", authMiddleware, vaccinationController.get);
vaccinationRouter.put("/", authMiddleware, vaccinationController.update);
vaccinationRouter.delete("/", authMiddleware, vaccinationController.delete);
