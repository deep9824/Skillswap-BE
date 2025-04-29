import mongoose from "mongoose";

export interface IMessage extends Document {
    chatId: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    message: string;
    timestamp: Date;
  }