import { Response } from "express";
import User from "../models/authModel";
import { AuthenticatedRequest } from "../interfaces/userInterface";
import { Template } from "../utils/email";

export const getUserProfile: any = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const user = await User.findById(req.user?._id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const updateUserProfile: any = async (
  req: AuthenticatedRequest & {
    body: {
      name?: string;
      email?: string;
      password?: string;
      bio?: string;
      skills?: string[];
      location?: string;
      role?: string;
    };
  },
  res: Response
) => {
  const user = await User.findById(req.user?._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    user.location = req.body.location || user.location;
    user.skills = req.body.skills || user.skills;
    user.role = req.body.role ?? user.role;

    const updatedUser = await user.save();

    res.json({
      message: `Hi ${updatedUser.name},Personal information is updated`,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const getAllUsers: any = async (req: Request, res: Response) => {
  try {
    const users: any = await User.find({}, { email: 1, _id: 0 });
    if (users) {
      for await (const recipient of users) {
        await Template(recipient.email, "../utils/home.ejs");
      }
      res.status(200).json({ message: "email sent" });
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
