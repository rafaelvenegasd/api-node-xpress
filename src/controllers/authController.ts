import { NextFunction, Request, Response } from "express";
//TODO: add the logic
export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("Here you will login");
    } catch (error) {
      next(error);
    }
  },
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("Here you will signup");
    } catch (error) {
      next(error);
    }
  },
};
