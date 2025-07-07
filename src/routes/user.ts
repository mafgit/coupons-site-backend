import { Router } from "express";
import {
  getUserById,
  getAllUsers,
  addUser,
  deleteUser,
  editUser,
} from "../controllers/user";

const router = Router();

router.post("/add", addUser);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);
router.get("/all", getAllUsers);
router.get("/by-id/:id", getUserById);

export default router;
