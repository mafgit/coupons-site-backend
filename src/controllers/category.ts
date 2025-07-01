import { Request, Response } from "express";
import Category from "../models/Category";

const getAllCategories = (req: Request, res: Response) => {
  Category.find()
    .then((categories) => {
      return res.json({ categories });
    })
    .catch((err) => {
      return res.json({ err });
    });
};

export { getAllCategories };
