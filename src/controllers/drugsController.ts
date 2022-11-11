import { NextFunction, Request, Response } from "express";
//TODO: add the logic
export const drugsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("Here you will create the drugs");
    } catch (error) {
      next(error);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("Here you will get the drugs");
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("Here you will update the drugs");
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("Here you will delete the drugs");
    } catch (error) {
      next(error);
    }
  },
};
