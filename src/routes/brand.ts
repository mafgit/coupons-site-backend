import { Router } from "express";
import {
  getAllBrands,
  getBrandBySlug,
  getBrandsForCategory,
} from "../controllers/brand";

const router = Router();

router.get("/by-slug/:slug", getBrandBySlug);
router.get("/all", getAllBrands);
router.get("/for-category/:id", getBrandsForCategory);

export default router;
