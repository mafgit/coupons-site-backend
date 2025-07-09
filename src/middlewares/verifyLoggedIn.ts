import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string;
  role?: "admin" | "user";
  token?: string;
}

export const verifyLoggedIn = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    console.log('going through verify logged in middleware ...');
    
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({ error: "Not logged in" });
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "my-secret"
    ) as { userId: string; role: "admin" | "user" };

    req.userId = decoded.userId;
    req.role = decoded.role;
    req.token = token
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Not logged in" });
  }
};
