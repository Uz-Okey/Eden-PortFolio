import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { Types } from "mongoose";

interface AuthRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    username: string;
    email: string;
  };
}

interface AuthRequests extends Request {
  user?: {
    role: string;
  };
}

interface DecodedToken {
  userId: string;
}

async function authentication(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedToken;

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
}

const isAdmin = async (
  req: AuthRequests,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ message: "user not authorise" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  next();
};

export { authentication, isAdmin };
