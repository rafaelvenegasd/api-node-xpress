import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    throw new Error("Missing auth token");
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    throw new Error("A token is required for authentication");
  }

  try {
    verify(token, process.env.JWT_SECRET || "");
  } catch (err) {
    throw new Error("Invalid Token");
  }
  return next();
};

export { authMiddleware };
