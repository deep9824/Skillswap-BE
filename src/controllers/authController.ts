import { Request, Response } from "express";
import User from "../models/authModel";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  let emailExist = await User.findOne({ email });
  if (emailExist) {
    res.status(400).json({ message: "Email already exists" });
  }
  let user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      message: "User Created !",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: await generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
