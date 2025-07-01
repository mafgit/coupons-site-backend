import { Router } from "express";
import { getAllCategories } from "../controllers/category";

const router = Router();

router.get("/all", getAllCategories);

export default router;
