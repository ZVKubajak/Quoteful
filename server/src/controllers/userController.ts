import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

export const getUsers = async (_req: Request, res: Response) => {
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

export const getUserById = async (req: Request, res: Response) => {
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

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email. Please provide a valid email." });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Invalid password. Password must be 8-20 characters long, include at least one lowercase letter, one uppercase letter, one number, and one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
      select: {
        id: true,
        username: true,
        email: true,
        myQuotes: true,
        createdAt: true,
      },
    });

    res.status(201).json({ message: "User created successfully.", user });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password, myQuotes } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const updateData: any = {};

    if (username) updateData.username = username;

    if (email) {
      if (!validator.isEmail(email)) {
        return res
          .status(400)
          .json({ message: "Invalid email. Please provide a valid email." });
      } else {
        updateData.email = email;
      }
    }

    if (password) {
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
          message:
            "Invalid password. Password must be 8-20 characters long, include at least one lowercase letter, one uppercase letter, one number, and one special character.",
        });
      } else {
        updateData.password = await bcrypt.hash(password, saltRounds);
      }
    }

    if (myQuotes) updateData.myQuotes = myQuotes;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        myQuotes: true,
        createdAt: true,
      },
    });

    res
      .status(200)
      .json({ message: "User updated successfully.", updatedUser });
  } catch (error: any) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      await prisma.user.delete({
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
