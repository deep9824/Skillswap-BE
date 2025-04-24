import express from "express";
import {
  sendSkillRequest,
  respondToRequest,
  getIncomingRequests,
  getSentRequests,
} from "../controllers/requestController";
import protect from "../middlewares/authMiddleware";

const requestRouter = express.Router();

requestRouter.post("/send", protect, sendSkillRequest);
requestRouter.put("/respond/:requestId", protect, respondToRequest);
requestRouter.get("/incoming", protect, getIncomingRequests);
requestRouter.get("/sent", protect, getSentRequests);
export default requestRouter;
