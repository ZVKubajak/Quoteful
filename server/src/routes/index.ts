import express from "express";
import { authenticateToken } from "../controllers/authController";
import { userRouter } from "./user/userRoutes";
import { authRouter } from "./auth/authRoutes";

const router = express.Router();

router.use("/user", authenticateToken, userRouter);
router.use("/auth", authRouter);

export default router;
