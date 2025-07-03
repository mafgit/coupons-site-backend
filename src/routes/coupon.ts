import { Router } from "express";
import {
  getCouponById,
  getCouponsForBrand,
  getAllCoupons,
  addCoupon,
  deleteCoupon,
  editCoupon,
} from "../controllers/coupon";

const router = Router();

router.get("/add", addCoupon);
router.put("/edit/:id", editCoupon);
router.delete("/delete/:id", deleteCoupon);
router.get("/all", getAllCoupons);
router.get("/for-brand/:id", getCouponsForBrand);
router.get("/by-id/:id", getCouponById);

export default router;
