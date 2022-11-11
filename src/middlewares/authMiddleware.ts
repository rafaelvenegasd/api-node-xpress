import { NextFunction, Request, Response } from "express";

const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {};

export { authMiddleware };
