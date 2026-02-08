import type { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import bcrypt from "bcryptjs";
import User from "../models/user";
import createToken from "../utils/createToken";

interface AuthRequest extends Request {
  user?: any;
}

const registerUser = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if(password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    createToken(res, user._id.toString());

    res.status(201).json({
      message: "successfully create a user",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user._id,
      },
    });
  },
);

const loginUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "invalid credentials" });
  }
  createToken(res, user._id.toString());
  res.status(200).json({
    message: "successfully logged in",
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
      id: user._id,
    },
  });
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//check user profile
const currentProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
  });
});

export { registerUser, loginUser, logoutUser, currentProfile };
