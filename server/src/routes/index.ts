import express from "express";
import { userRouter } from "./user/userRoutes";
import { authRouter } from "./auth/authRoutes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
