import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await UserService.getMyProfile(userId);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
