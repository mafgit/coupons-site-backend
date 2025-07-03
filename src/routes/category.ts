import { Router } from "express";
import {
  addCategory,
  getAllCategories,
  getCategoryById,
  editCategory,
  deleteCategory,
} from "../controllers/category";

const router = Router();

router.post("/add", addCategory);
router.put("/edit/:id", editCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/all", getAllCategories);
router.get("/by-id", getCategoryById);

export default router;
