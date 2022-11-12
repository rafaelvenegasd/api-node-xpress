import { NextFunction, Request, Response } from "express";
import { authLoginUseCase } from "../useCases/auth/authLogin/authLoginUseCase";
import { authSignupUseCase } from "../useCases/auth/authSignup/authSignupUseCase";

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const data = await authLoginUseCase({ email, password });
      switch (data.type) {
        case "incomplete_info" || "not_found":
          res.status(400).json({ data });
          break;
        case "not_matched_pass":
          res.status(409).json({ data });
          break;
        default:
          res.status(201).json({ data });
          break;
      }
    } catch (error) {
      next(error);
    }
  },
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name } = req.body;
      const data = await authSignupUseCase({ email, password, name });
      switch (data.type) {
        case "incomplete_info":
          res.status(400).json({ data });
          break;
        case "already_exist":
          res.status(409).json({ data });
          break;
        default:
          res.status(201).json({ data });
          break;
      }
    } catch (error) {
      next(error);
    }
  },
};
