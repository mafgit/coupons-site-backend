import { Router } from "express";
import { login, me, signup, logout } from "../controllers/auth";
import { verifyLoggedIn } from "../middlewares/verifyLoggedIn";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", verifyLoggedIn, logout);
router.get("/me", verifyLoggedIn, me);

export default router;
