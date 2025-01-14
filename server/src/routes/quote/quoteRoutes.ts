import { Router } from "express";
import { getQuotesByUserId } from "../../controllers/quoteController";

const router = Router();

router.get("/:id", getQuotesByUserId);

export { router as quoteRouter };
