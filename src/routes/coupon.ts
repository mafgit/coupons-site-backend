import { Router } from "express";
import {
  getCouponById,
  getCouponsForBrand,
  getAllCoupons,
  addCoupon,
  deleteCoupon,
  editCoupon,
  searchOffers,
  viewCouponById,
} from "../controllers/coupon";

const router = Router();

router.get("/add", addCoupon);
router.get("/search", searchOffers);
router.put("/edit/:id", editCoupon);
router.delete("/delete/:id", deleteCoupon);
router.get("/all", getAllCoupons);
router.get("/for-brand/:id", getCouponsForBrand);
router.get("/by-id/:id", getCouponById);
router.post("/view-by-id/:id", viewCouponById);

export default router;
