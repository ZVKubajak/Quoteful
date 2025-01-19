import { Router } from "express";
import {
  getQuotes,
  getQuotesByUserId,
  getQuotesByTag,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
} from "../../controllers/quoteController";

const router = Router();

router.get("/", getQuotes);
router.get("/user/:id", getQuotesByUserId);
router.get("/tag/:tag", getQuotesByTag);
router.get("/:id", getQuoteById);
router.post("/", createQuote);
router.put("/:id", updateQuote);
router.delete("/:id", deleteQuote);

export { router as quoteRouter };
