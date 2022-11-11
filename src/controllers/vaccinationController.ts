import { NextFunction, Request, Response } from "express";
//TODO: add the logic
export const vaccinationController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("Here you will create the vaccinations");
    } catch (error) {
      next(error);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("Here you will get the vaccinations");
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("Here you will update the vaccinations");
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("Here you will delete the vaccinations");
    } catch (error) {
      next(error);
    }
  },
};
