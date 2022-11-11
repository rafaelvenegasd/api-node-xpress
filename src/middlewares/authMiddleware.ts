import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    throw new Error("Missing auth token");
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET || "");
    req.body = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export { authMiddleware };
