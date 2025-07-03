import { Request, Response } from "express";
import Category from "../models/Category";
import { ICategory } from "../types/ICategory";
import { validateCategory } from "../utils/validateEntity";
import mongoose from "mongoose";

export const getAllCategories = async (
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

    const categories = await Category.find(query);
    res.json({ categories });
  } catch (err) {
    res.json({ err });
  }
};

export const getCategoryById = (req: Request, res: Response): void => {
  Category.findById(req.body.id)
    .then((category) => {
      res.json({ category });
    })
    .catch((err) => {
      res.json({ err });
    });
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const data: ICategory = req.body;
    const { valid, error } = validateCategory(data);
    if (!valid) {
      res.json({ success: false, error });
      return;
    }
    await Category.create(data);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const editCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");

    const { valid, error } = validateCategory(req.body);
    if (valid) {
      const category = await Category.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        req.body
      );
      res.json({ category, success: true });
    } else {
      res.json({ success: false, error });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
    await Category.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
};
