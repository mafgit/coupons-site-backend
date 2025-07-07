import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  userId?: string;
  role?: "admin" | "user";
}

export const verifyAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.userId || req.role !== "admin") throw new Error("Not an admin");
    next();
  } catch (err) {
    res.status(401).json({ error: "Not an admin" });
  }
};
