import { Request, Response } from "express";
import { validateUser } from "../utils/validateEntity";
import User from "../models/User";
import { IUser } from "../types/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: IUser = req.body;
    const { valid, error } = validateUser(data);
    if (error || !valid) throw new Error(error);
    const user = await User.findOne({ email: data.email });
    if (!user) throw new Error("User not found");
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid password");

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET ?? "my secret",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    res.json({ success: true, userId: user._id, role: user.role });
  } catch (err: any) {
    res
      .status(400)
      .json({ error: err.message ?? "Something went wrong", success: false });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: IUser = req.body;
    const { valid, error } = validateUser(data);

    if (error || !valid) throw new Error(error);

    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      res.status(400).json({ error: "User already exists", success: false });
      return;
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({ ...req.body, password: hashedPassword });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET ?? "my secret",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    res.json({ userId: user._id, success: true, role: user.role });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

interface AuthRequest extends Request {
  userId?: string;
  role?: "admin" | "user";
}

export const me = async (req: AuthRequest, res: Response): Promise<void> => {
  console.log("received me");

  res.json({ userId: req.userId, role: req.role });
};

export const logout = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  res.clearCookie("token");
  req.userId = undefined;
  req.role = undefined;
  res.json({ success: true });
};
