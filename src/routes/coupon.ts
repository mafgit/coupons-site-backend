import { Router } from "express";
import { getCoupon, getCouponsForBrand } from "../controllers/coupon";

const router = Router();

router.get("/for-brand/:id", getCouponsForBrand);
router.get("/:id", getCoupon);

export default router;
