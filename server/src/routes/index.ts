import express from "express";
import { authenticateToken } from "../controllers/authController";
import { userRouter } from "./user/userRoutes";
import { authRouter } from "./auth/authRoutes";
import { quoteRouter } from "./quote/quoteRoutes";
import { AIRouter } from "./ai/AIRoutes";

const router = express.Router();

router.use(
  "/user",
  // authenticateToken,
  userRouter
);
router.use("/auth", authRouter);
router.use("/quote", quoteRouter);
router.use("/ai", AIRouter);

export default router;
