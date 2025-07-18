import express from "express";
import { getAllUsers, getUserProfile, updateUserProfile } from "../controllers/userController";
import protect from "../middlewares/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/getProfile", protect, getUserProfile);
userRoutes.put("/updateProfile", protect, updateUserProfile);
userRoutes.get("/allUsers",getAllUsers)


export default userRoutes;
