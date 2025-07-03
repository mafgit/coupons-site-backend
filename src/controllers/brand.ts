import { Request, Response } from "express";
import Brand from "../models/Brand";
import Coupon from "../models/Coupon";
import { IBrand } from "../types/IBrand";
import { validateBrand } from "../utils/validateEntity";
import mongoose from "mongoose";

export const getAllBrands = async (
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
    if (req.query.slug)
      query["slug"] = { $regex: req.query.slug, $options: "i" };
    // if (req.query.category)
    //   query["category"] = { $regex: req.query.category, $options: "i" };

    let brands = await Brand.find(query).populate("category");
    if (req.query.category) {
      brands = brands.filter(
        (brand) => (brand.category as any).name === req.query.category
      );
    }
    res.json({ brands });
  } catch (err) {
    res.json({ err, brands: [] });
  }
};

export const getBrandsForCategory = (req: Request, res: Response): void => {
  Brand.find({ category: req.params.id })
    .populate("category")
    .then((brands) => {
      res.json({ brands });
    })
    .catch((err) => {
      res.json({ err });
    });
};

export const getBrandBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;
    const brand = await Brand.findOne({ slug }).populate("category");
    let coupons: any = [];
    if (brand) coupons = await Coupon.find({ brand: brand._id });
    res.json({ brand, coupons });
  } catch (err) {
    res.json({ err });
  }
};

export const getBrandById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id).populate("category");
    res.json({ brand });
  } catch (err) {
    res.json({ err });
  }
};

export const addBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: IBrand = req.body;

    const { valid, error } = validateBrand(data);
    if (!valid) {
      res.json({ success: false, error });
      return;
    }

    await Brand.create(data);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const editBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
    const { valid, error } = validateBrand(req.body);
    if (valid) {
      const brand = await Brand.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        req.body
      );
      res.json({ brand, success: true });
    } else {
      res.json({ success: false, error });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const deleteBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
    await Brand.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
};
