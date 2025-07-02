import type { Request, Response } from "express";
import Brand from "../models/Brand";
import Coupon from "../models/Coupon";

export const getAllBrands = (req: Request, res: Response) => {
  Brand.find()
    .populate("category")
    .then((brands) => {
      return res.json({ brands });
    })
    .catch((err) => {
      return res.json({ err });
    });
};

export const getBrandsForCategory = (req: Request, res: Response) => {
  Brand.find({ category: req.params.id })
    .populate("category")
    .then((brands) => {
      return res.json({ brands });
    })
    .catch((err) => {
      return res.json({ err });
    });
};

export const getBrandBySlug = async (req: any, res: any) => {
  try {
    const { slug } = req.params;
    const brand = await Brand.findOne({ slug }).populate("category");
    let coupons: any = [];
    if (brand) coupons = await Coupon.find({ brand: brand._id });
    return res.json({ brand, coupons });
  } catch (err) {
    return res.json({ err });
  }
};