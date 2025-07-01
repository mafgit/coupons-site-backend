import { Request, Response } from "express";
import Coupon from "../models/Coupon";

const getCouponsForBrand = (req: Request, res: Response) => {
  Coupon.find({ brand: req.params.id })
    .populate("brand")
    .then((coupons) => {
      return res.json({ coupons });
    })
    .catch((err) => {
      return res.json({ err });
    });
};

const getCoupon = (req: Request, res: Response) => {
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

export { getCoupon, getCouponsForBrand };
