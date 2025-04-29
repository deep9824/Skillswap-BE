import express from "express";
import { getAllChats, getMessageByRequestId } from "../controllers/messageController";
import protect from "../middlewares/authMiddleware";

const chatRouter = express.Router();
chatRouter.get("/getChats", protect, getAllChats);
chatRouter.get("/:requestId", protect, getMessageByRequestId);

export default chatRouter;
