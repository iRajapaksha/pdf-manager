import { Request, Response } from "express";
import * as ActivityService from "../services/activity.service";

export const getActivity = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const activities = await ActivityService.getUserActivity(userId);
  res.json({ success: true, activities });
};
