import { Response } from "express";
import Message from "../models/chatModel";
import SkillRequest from "../models/requestModel";
import { AuthenticatedRequest } from "../interfaces/userInterface";
import Conversation from "../models/messageModel";

export const getAllChats: any = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user._id;
    const chats = await SkillRequest.find({
      status: "accepted",
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name email skills")
      .populate("receiver", "name email skills")
      .populate("skill", "title");
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMessageByRequestId: any = async (req: any, res: Response) => {
  const requestId = req.params.requestId;
  const userId = req.user?.id;

  try {
    const skillRequest = await SkillRequest.findById(requestId);
    if (!skillRequest) {
      return res.status(404).json({ message: "Skill request not found" });
    }
    if (
      skillRequest.status != "accepted" ||
      (skillRequest.sender.toString() != userId &&
        skillRequest.receiver.toString() != userId)
    ) {
      return res
        .status(403)
        .json({ message: "Access denied or request not accepted" });
    }
    const messages = await Message.find({ requestId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async ({
  requestId,
  sender,
  content,
}: {
  requestId: string;
  sender: string;
  content: string;
}) => {
  const newMessage = await Conversation.create({
    requestId,
    sender,
    content,
  });

  return newMessage;
};