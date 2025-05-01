import { app } from "./app";
import http from "http";
import connectDB from "./configs/db";
import { setupSocket } from "./utils/socket";
import { startRequestCronJob } from "./cronjobs/cleanupRequests";

const server = http.createServer(app);
setupSocket(server);
const port = process.env.PORT || 5001;
startRequestCronJob()
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err: Error) => {
    console.log("MongoDB Connection error ", err);
  });
