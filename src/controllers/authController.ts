import { Request, Response } from "express";
import User from "../models/authModel";
import generateToken from "../utils/generateToken";

export const registerUser: any = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).json({ message: "Email already exists" });
  }
  let user = await User.create({ email, password });
  if (user) {
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      token: await generateToken(user._id),
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
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
