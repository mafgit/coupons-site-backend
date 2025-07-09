import { Request, Response } from "express";
import { validateUser } from "../utils/validateEntity";
import User from "../models/User";
import { IUser } from "../types/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Session from "../models/Session";
import mongoose from "mongoose";
import { maxLoggedInReached, signAndSetToken } from "../utils/token";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: IUser = req.body;
    const { valid, error } = validateUser(data);
    if (error || !valid) throw new Error(error);
    const user = await User.findOne({ email: data.email });
    if (!user) throw new Error("User not found");
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid password");

    const maxReached = await maxLoggedInReached(user._id);
    if (maxReached)
      throw new Error(
        "You are already signed in too many devices. Log out from one of them and try again."
      );

    await signAndSetToken(user, res);

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

    await signAndSetToken(user, res);

    res.json({ userId: user._id, success: true, role: user.role });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

interface AuthRequest extends Request {
  userId?: string;
  role?: "admin" | "user";
  token?: string;
}

export const me = async (req: AuthRequest, res: Response): Promise<void> => {
  console.log("received me");

  res.json({ userId: req.userId, role: req.role });
};

export const logout = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    console.log("received logout ", req.token);
    await Session.deleteOne({ token: req.token });
    res.clearCookie("token");
    req.userId = undefined;
    req.role = undefined;
    req.token = undefined;
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.clearCookie("token");
    req.userId = undefined;
    req.role = undefined;
    req.token = undefined;
    res.status(400).json({ success: false });
  }
};
