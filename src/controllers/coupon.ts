import { Request, Response } from "express";
import Coupon from "../models/Coupon";
import { ICoupon } from "../types/ICoupon";
import { validateCoupon } from "../utils/validateEntity";
import mongoose from "mongoose";

export const getCouponsForBrand = (req: Request, res: Response) => {
  Coupon.find({ brand: req.params.id })
    .populate("brand")
    .then((coupons) => {
      return res.json({ coupons });
    })
    .catch((err) => {
      return res.json({ err });
    });
};

export const getCouponById = (req: Request, res: Response) => {
  const { id } = req.params;

  Coupon.findById(id)
    .populate("brand")
    .then((coupon) => {
      return res.json({ coupon });
    })
    .catch((err) => {
      return res.json({ err });
    });
};

export const getAllCoupons = async (
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
    if (req.query.title)
      query["title"] = { $regex: req.query.title, $options: "i" };
    if (req.query.code)
      query["code"] = { $regex: req.query.code, $options: "i" };
    if (req.query.type)
      query["type"] = req.query.type === "true" ? true : false;
    if (req.query.verified) query["verified"] = { $eq: req.query.verified };
    if (req.query.type)
      query["code"] = { $regex: req.query.code, $options: "i" };
    if (req.query.price)
      query["price"] = { $eq: parseFloat(req.query.price as string) };
    // if (req.query.category)
    //   query["category"] = { $regex: req.query.category, $options: "i" };

    console.log(query);

    let coupons = await Coupon.find(query).populate("brand");
    if (req.query.brand) {
      coupons = coupons.filter(
        (coupon) => (coupon.brand as any).name === (req.query.brand as string)
      );
    }
    res.json({ coupons });
  } catch (err) {
    res.json({ err, coupons: [] });
  }
};

export const addCoupon = async (req: Request, res: Response) => {
  try {
    const data: ICoupon = req.body;

    const { valid, error } = validateCoupon(data);
    if (!valid) {
      res.json({ success: false, error });
      return;
    }

    await Coupon.create(data);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const editCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
    const { valid, error } = validateCoupon(req.body);
    if (valid) {
      const coupon = await Coupon.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        req.body
      );
      res.json({ coupon, success: true });
    } else {
      res.json({ success: false, error });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const deleteCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
    await Coupon.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
};
