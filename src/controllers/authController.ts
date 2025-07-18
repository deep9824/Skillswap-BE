import { Request, Response } from "express";
import User from "../models/authModel";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await User.create({ name, email, password });
    if (user) {
      return res.status(201).json({ message: "User Created!" });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        email: user.email,
        token: await generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : error });
  }
};
