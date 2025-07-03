import { Router } from "express";
import {
  getAllBrands,
  getBrandBySlug,
  getBrandsForCategory,
  addBrand,
  editBrand,
  deleteBrand,
  getBrandById,
} from "../controllers/brand";

const router = Router();

router.post("/add", addBrand);
router.put("/edit/:id", editBrand);
router.delete("/delete/:id", deleteBrand);
router.get("/all", getAllBrands);
router.get("/by-slug/:slug", getBrandBySlug);
router.get("/by-id/:id", getBrandById);
router.get("/for-category/:id", getBrandsForCategory);

export default router;
