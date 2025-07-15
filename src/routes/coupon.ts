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
  reorderCoupon,
} from "../controllers/coupon";
import { verifyLoggedIn } from "../middlewares/verifyLoggedIn";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = Router();

router.get("/add", addCoupon);
router.get("/search", searchOffers);
router.post('/reorder', verifyLoggedIn, verifyAdmin, reorderCoupon)
router.put("/edit/:id", editCoupon);
router.delete("/delete/:id", deleteCoupon);
router.get("/all", getAllCoupons);
router.get("/for-brand/:id", getCouponsForBrand);
router.get("/by-id/:id", getCouponById);
router.post("/view-by-id/:id", viewCouponById);

export default router;
