import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interfaces/chatnterface";

const ConversationSchema = new Schema<IMessage>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Chat", // if you maintain a separate Chat collection
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const Conversation=mongoose.model<IMessage>("Conversation", ConversationSchema);
export default Conversation
