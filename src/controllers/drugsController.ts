import { NextFunction, Request, Response } from "express";
import { drugsCreateUseCase } from "../useCases/drugs/drugsCreate/drugsCreateUseCase";
import { drugsDeleteUseCase } from "../useCases/drugs/drugsDelete/drugsDeleteUseCase";
import { drugsGetUseCase } from "../useCases/drugs/drugsGet/drugsGetUseCase";
import { drugsUpdateUseCase } from "../useCases/drugs/drugsUpdate/drugsUpdateUseCase";
import { prisma } from "../services/prisma";

export const drugsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, approved, minDose, maxDose, availableAt } = req.body;
      const data = await drugsCreateUseCase(prisma, {
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
      const data = await drugsGetUseCase(prisma, {
        select: {
          id: true,
          name: true,
          approved: true,
          minDose: true,
          maxDose: true,
          availableAt: true,
        },
      });
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, approved, minDose, maxDose, availableAt } = req.body;
      const { drugId } = req.params;
      const data = await drugsUpdateUseCase({
        id: Number(drugId),
        data: {
          name,
          approved,
          minDose,
          maxDose,
          availableAt,
        },
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
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { drugId } = req.params;
      const data = await drugsDeleteUseCase(prisma, {
        id: Number(drugId),
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
