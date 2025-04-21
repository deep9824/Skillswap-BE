import { Response } from "express";
import User from "../models/authModel";
import { AuthenticatedRequest } from "../interfaces/userInterface";

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
      isMentor?: boolean;
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
    user.isMentor = req.body.isMentor ?? user.isMentor;

    const updatedUser = await user.save();

    res.json({
      message: `Hi ${updatedUser.name},Personal information is updated`,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
