import { Request, Response } from "express";
import User from "../models/User";
import { IUser } from "../types/IUser";
import { validateUser } from "../utils/validateEntity";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query: { [key: string]: any } = {};
    if (
      req.query._id &&
      mongoose.Types.ObjectId.isValid(req.query._id as string)
    )
      query["_id"] = new mongoose.Types.ObjectId(req.query._id as string);
    if (req.query.name)
      query["name"] = { $regex: req.query.name, $options: "i" };
    if (req.query.email)
      query["email"] = { $regex: req.query.email, $options: "i" };

    console.log(query);

    const users = await User.find(query);
    res.json({ users });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const getUserById = (req: Request, res: Response): void => {
  if (req.params.id && mongoose.Types.ObjectId.isValid(req.params.id as string))
    User.findById(new mongoose.Types.ObjectId(req.params.id as string))
      .then((user) => {
        console.log(user);
        
        res.json({ user });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  else res.status(400).json({ err: "Invalid Id" });
};

export const addUser = async (req: Request, res: Response) => {
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

    await User.create({ ...req.body, password: hashedPassword });
    res.json({ success: true });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, error });
  }
};

export const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");

    const { valid, error } = validateUser(req.body);
    if (valid) {
      const user = await User.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        req.body
      );
      res.json({ user, success: true });
    } else {
      res.json({ success: false, error });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
    await User.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
