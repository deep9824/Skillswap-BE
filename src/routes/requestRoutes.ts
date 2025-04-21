import express from "express";
import {
  sendSkillRequest,
  respondToRequest,
} from "../controllers/requestController";
import protect from "../middlewares/authMiddleware";

const requestRouter = express.Router();

requestRouter.post("/send", protect, sendSkillRequest);
requestRouter.put("/respond/:requestId", protect, respondToRequest);

export default requestRouter;
