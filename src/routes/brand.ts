import { Router } from "express";
import {
  getAllBrands,
  getBrandBySlug,
  getBrandsForCategory,
  addBrand,
  editBrand,
  deleteBrand,
  getBrandById,
  rateBrand,
} from "../controllers/brand";
import { verifyLoggedIn } from "../middlewares/verifyLoggedIn";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = Router();

router.post("/add", verifyLoggedIn, verifyAdmin, addBrand);
router.put("/edit/:id", verifyLoggedIn, verifyAdmin, editBrand);
router.delete("/delete/:id", verifyLoggedIn, verifyAdmin, deleteBrand);
router.get("/all", getAllBrands);
router.get("/by-slug/:slug", getBrandBySlug);
router.get("/by-id/:id", getBrandById);
router.get("/for-category/:id", getBrandsForCategory);
router.post('/rate/:id', rateBrand)

export default router;
