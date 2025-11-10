import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const token = await AuthService.registerUser(username, email, password);
  res.json({ success: true, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await AuthService.loginUser(email, password);
  res.json({ success: true, token });
};
