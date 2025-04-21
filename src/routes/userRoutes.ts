import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController";
import protect from "../middlewares/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/getProfile", protect, getUserProfile);
userRoutes.put("/updateProfile", protect, updateUserProfile);


export default userRoutes;
