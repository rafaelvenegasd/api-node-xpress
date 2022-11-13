import { NextFunction, Request, Response } from "express";
import { vaccinationCreateUseCase } from "../useCases/vaccination/vaccinationCreate/vaccinationCreateUseCase";
import { vaccinationDeleteUseCase } from "../useCases/vaccination/vaccinationDelete/vaccinationDeleteUseCase";
import { vaccinationGetUseCase } from "../useCases/vaccination/vaccinationGet/vaccinationGetUseCase";
import { vaccinationUpdateUseCase } from "../useCases/vaccination/vaccinationUpdate/vaccinationUpdateUseCase";
import { prisma } from "../services/prisma";

export const vaccinationController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, drugId, dose, date } = req.body;
      const data = await vaccinationCreateUseCase(prisma, {
        name,
        drugId,
        dose,
        date,
      });
      switch (data.type) {
        case "incomplete" || "drugId_not_valid":
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
      const data = await vaccinationGetUseCase(prisma, {
        select: {
          id: true,
          name: true,
          drugId: true,
          dose: true,
          date: true,
        },
      });
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, drugId, dose, date } = req.body;
      const { vaccinationId } = req.params;
      const data = await vaccinationUpdateUseCase({
        id: Number(vaccinationId),
        data: {
          name,
          drugId,
          dose,
          date,
        },
      });
      switch (data.type) {
        case "does_not_exist" || "drugId_not_valid":
          res.status(400).json({ data });
          break;
        default:
          res.status(201).json({ data });
          break;
      }
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { vaccinationId } = req.params;
      const data = await vaccinationDeleteUseCase(prisma, {
        id: Number(vaccinationId),
      });
      switch (data.type) {
        case "does_not_exist":
          res.status(400).json({ data });
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
