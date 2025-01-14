import { Router } from "express";
import {
  getQuotesByUserId,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
} from "../../controllers/quoteController";

const router = Router();

router.get("/user/:id", getQuotesByUserId);
router.get("/:id", getQuoteById);
router.post("/", createQuote);
router.put("/:id", updateQuote);
router.delete("/:id", deleteQuote);

export { router as quoteRouter };
