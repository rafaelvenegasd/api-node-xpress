import { NextFunction, Request, Response } from "express";
import { vaccinationCreateUseCase } from "../useCases/vaccination/vaccinationCreate/vaccinationCreateUseCase";

export const vaccinationController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, drugId, dose, date } = req.body;
      const data = await vaccinationCreateUseCase({
        name,
        drugId,
        dose,
        date,
      });
      switch (data.type) {
        case "incomplete" || "drug_not_found":
          res.status(400).json({ data });
          break;
        case "already_exists" || "drug_dose_not_allowed" || "date_not_allowed":
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
