import { Router } from "express";
import { vaccinationController } from "../controllers/vaccinationController";

export const vaccinationRouter = Router();

vaccinationRouter.post("/", vaccinationController.create);
vaccinationRouter.get("/", vaccinationController.get);
vaccinationRouter.put("/", vaccinationController.update);
vaccinationRouter.delete("/", vaccinationController.delete);
