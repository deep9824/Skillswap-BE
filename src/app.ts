import express, { Express } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app: Express = express();
app.use(express.json());

app.use('/api/auth', authRoutes);


export { app };
