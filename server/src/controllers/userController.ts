import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        myQuotes: true,
        createdAt: true,
      },
    });

    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        myQuotes: true,
        createdAt: true,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error: any) {
    console.error("Error fetching user by id:", error);
    res.status(500).json({ message: error.message });
  }
};
