import express from "express";
import { createSkillListing, getAllSkills } from "../controllers/skillController";
import protect from "../middlewares/authMiddleware";

const skillRoutes = express.Router();

skillRoutes.post("/postSkill", protect, createSkillListing);
skillRoutes.get("/getSkill", getAllSkills);

export default skillRoutes;
