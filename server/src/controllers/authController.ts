import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const saltRounds = 10;

// Interfaces are optional in case of errors. //

interface JwtPayload {
  id: string;
  username: string;
  myQuotes: string[];
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY || "";

    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        return res
          .status(403)
          .json({ status: "Forbidden", message: "Invalid or expired token." });
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.status(401).json({
      status: "Unauthorized",
      message: "Authorization header is missing.",
    });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

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

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
      select: {
        id: true,
        username: true,
      },
    });

    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      secretKey,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      message: "User created successfully.",
      token,
    });
  } catch (error: any) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed." });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Authentication failed." });
    }

    const secretKey = process.env.JWT_SECRET_KEY || "";

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "24h" }
    );
    return res.json({ token });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: error.message });
  }
};
