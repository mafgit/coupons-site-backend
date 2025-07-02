import { Request, Response } from "express";
import Coupon from "../models/Coupon";

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

export const getCoupon = (req: Request, res: Response) => {
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

export const getAllCoupons = (req: Request, res: Response) => {
  Coupon.find()
    // .populate("brand")
    .then((coupons) => {
      return res.json({ coupons });
    })
    .catch((err) => {
      return res.json({ err });
    });
};
