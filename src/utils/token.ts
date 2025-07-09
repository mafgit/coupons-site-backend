import mongoose from "mongoose";
import Session from "../models/Session";
import jwt from "jsonwebtoken";
import { Response } from "express";

export const maxLoggedInReached = async (
  userId: mongoose.Types.ObjectId,
  maxCount = 2
) => {
  const sessions = await Session.find({ userId });
  if (sessions.length >= maxCount) return true;
  return false;
};

export const signAndSetToken = async (
  user: any,
  res: Response
  // createSession = true
) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET ?? "my-secret",
    { expiresIn: "1d" }
  );

  const maxAge = 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    maxAge,
    sameSite: "lax",
    secure: false,
  });

  // if (createSession)
  await Session.create({
    userId: user._id,
    token,
    expiresAt: Date.now() + maxAge,
  });

  return token;
};
