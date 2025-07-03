import { Router } from "express";
import {
  getCouponById,
  getCouponsForBrand,
  getAllCoupons,
  addCoupon,
} from "../controllers/coupon";

const router = Router();

router.get("/add", addCoupon);
router.get("/all", getAllCoupons);
router.get("/for-brand/:id", getCouponsForBrand);
router.get("/by-id/:id", getCouponById);

export default router;
