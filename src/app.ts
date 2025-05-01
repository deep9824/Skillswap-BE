import express, { Express } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import skillRoutes from "./routes/skillsRoutes";
import requestRouter from "./routes/requestRoutes";
import chatRouter from "./routes/chatRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config();
const app: Express = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/request", requestRouter);
app.use("/api/chat", chatRouter);
app.use(errorHandler);
export { app };
