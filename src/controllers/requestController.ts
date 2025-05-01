import { NextFunction, Response } from "express";
import SkillRequest from "../models/requestModel";
import { AuthenticatedRequest } from "../interfaces/userInterface";

export const sendSkillRequest: any = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { receiverId, skillId, message }: any = req.body;
  const senderId = req.user?._id;

  const alreadyRequested = await SkillRequest.findOne({
    sender: senderId,
    receiver: receiverId,
    skill: skillId,
  });

  if (alreadyRequested) {
    return res
      .status(400)
      .json({ message: "You’ve already sent a request for this skill" });
  }

  const request = await SkillRequest.create({
    sender: senderId,
    receiver: receiverId,
    skill: skillId,
    message,
  });

  res.status(201).json(request);
};

export const respondToRequest: any = async (req: any, res: Response) => {
  const { requestId } = req?.params;
  const { status }: any = req.body;

  const request = await SkillRequest.findById(requestId);

  if (!request) return res.status(404).json({ message: "Request not found" });

  if (request.receiver.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You’re not authorized to respond to this request" });
  }

  request.status = status;
  await request.save();

  res.json({ message: `Request ${status}` });
};

export const getIncomingRequests: any = async (
  req: AuthenticatedRequest,
  res: Response,
  next:NextFunction
) => {
  try {
    const requests = await SkillRequest.find({ receiver: req.user._id })
      .populate("sender", "name email")
      .populate("skill", "title")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    next(error); 
  }
};

export const getSentRequests: any = async (
  req: AuthenticatedRequest,
  res: Response,
  next:NextFunction
) => {
  try {
    const requests = await SkillRequest.find({ sender: req.user._id })
      .populate("receiver", "name email")
      .populate("skill", "title")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    next(error); 
  }
};
