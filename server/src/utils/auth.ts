import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
    console.log(secretKey);

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
    res
      .status(401)
      .json({
        status: "Unauthorized",
        message: "Authorization header is missing.",
      });
  }
};
