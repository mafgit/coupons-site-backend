import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string;
  role?: "admin" | "user";
}

export const verifyLoggedIn = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({ error: "Not logged in" });
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "my secret"
    ) as { userId: string; role: "admin" | "user" };

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ error: "Not logged in" });
  }
};
