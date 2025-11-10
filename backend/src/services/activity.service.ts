import { Activity } from "../models/activity.model";

export const getUserActivity = async (userId: string) => {
  return await Activity.find({ userId }).sort({ timestamp: -1 });
};
