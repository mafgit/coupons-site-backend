import { Router } from "express";
import { getCoupon, getCouponsForBrand, getAllCoupons } from "../controllers/coupon";

const router = Router();

router.get("/all", getAllCoupons);
router.get("/for-brand/:id", getCouponsForBrand);
router.get("/:id", getCoupon);

export default router;
