import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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
