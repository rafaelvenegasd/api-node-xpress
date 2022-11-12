import { NextFunction, Request, Response } from "express";
import { drugsCreateUseCase } from "../useCases/drugsCreate/drugsCreateUseCase";

export const drugsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, approved, minDose, maxDose, availableAt } = req.body;
      const data = await drugsCreateUseCase({
        name,
        approved,
        minDose,
        maxDose,
        availableAt,
      });
      switch (data.type) {
        case "incomplete":
          res.status(400).json({ data });
          break;
        case "already_exists":
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
