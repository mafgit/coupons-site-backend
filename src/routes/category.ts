import { Router } from "express";
import {
  addCategory,
  getAllCategories,
  getCategoryById
} from "../controllers/category";

const router = Router();

router.post("/add", addCategory);
router.get("/all", getAllCategories);
router.get("/by-id", getCategoryById);

export default router;
