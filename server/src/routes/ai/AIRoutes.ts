import { Router } from "express";
import { generateAIResponse } from "../../controllers/AIController";

const router = Router();

router.post("/", generateAIResponse);

export { router as AIRouter };
