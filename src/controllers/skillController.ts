import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces/userInterface";
import Skill from "../models/skillsModel";

export const createSkillListing: any = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { title, description, skillCategory, type, location }: any = req.body;

  if (!title || !description || !skillCategory || !type) {
    res.status(400).json({ message: "All required fields must be filled" });
  }

  const skill = new Skill({
    title,
    description,
    skillCategory,
    type,
    location,
    createdBy: req.user._id,
  });

  const createdSkill = await skill.save();
  res.status(201).json(createdSkill);
};

export const getAllSkills = async (req: any, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const keyword = req.query.keyword
      ? {
          title: { $regex: req.query.keyword, $options: "i" },
        }
      : {};

    const filter = {
      ...keyword,
    };

    const total = await Skill.countDocuments(filter);

    const skills = await Skill.find()
      .populate("createdBy", "name skills bio")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    res.status(200).json({
      skills,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalSkills: total,
    });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: "Server error" });
  }
};
