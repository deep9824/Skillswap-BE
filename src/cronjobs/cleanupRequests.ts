import cron from "node-cron";
import SkillRequest from "../models/requestModel";

export const startRequestCronJob = () => {
  cron.schedule("0 0 * * 1", async () => {
    const result = await SkillRequest.deleteMany({
      status: "pending",
      createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });
    console.log(`Deleted ${result.deletedCount} old pending requests.`);
  });
};
