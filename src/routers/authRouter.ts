import { Router } from "express";
import { authController } from "../controllers/authController";

export const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/sign-up", authController.signup);
