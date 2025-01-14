import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import validator from "validator";

const prisma = new PrismaClient();

export const getQuotesByUserId = async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const quotes = await prisma.quote.findMany({
      where: { userId: id },
      select: {
        id: true,
        user: true,
        tag: true,
        content: true,
        createdAt: true,
      },
    });

    if (quotes.length === 0) {
      res.status(404).json({ message: "No quotes found from this user." });
    } else {
      res.status(200).json(quotes);
    }
  } catch (error: any) {
    console.error("Error fetching quotes by user id:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getQuoteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const quote = await prisma.quote.findUnique({
      where: { id },
      select: {
        id: true,
        user: true,
        tag: true,
        content: true,
        createdAt: true,
      },
    });

    if (quote) {
      res.status(200).json(quote);
    } else {
      res.status(404).json({ message: "Quote not found." });
    }
  } catch (error: any) {
    console.error("Error fetching quote by id:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createQuote = async (req: Request, res: Response) => {
  const { userId, tag, content } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ message: "userId is missing." });
    } else if (!content || validator.isEmpty(content)) {
      return res.status(400).json({ message: "Content is required." });
    }

    const quote = prisma.quote.create({
      data: {
        userId,
        tag: tag || null,
        content,
      },
    });

    res.status(201).json({ message: "Quote created successfully.", quote });
  } catch (error: any) {
    console.error("Error creating quote:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateQuote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tag, content } = req.body;

  try {
    const quote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!quote) {
      return res.status(404).json({ message: "Quote not found." });
    }

    const updateData: any = {};

    if (tag) updateData.tag = tag;

    if (!content || validator.isEmpty(content)) {
      return res.status(400).json({ message: "Content is required." });
    }

    const updatedQuote = await prisma.quote.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        user: true,
        tag: true,
        content: true,
        createdAt: true,
      },
    });

    res
      .status(200)
      .json({ message: "Quote updated successfully.", updateQuote });
  } catch (error: any) {
    console.error("Error updating quote:", error);
    res.json(500).json({ message: error.message });
  }
};

export const deleteQuote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.quote.findUnique({
      where: { id },
    });

    if (user) {
      await prisma.quote.delete({
        where: { id },
      });
      res.status(200).json({ message: "User deleted successfully." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error: any) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: error.message });
  }
};
